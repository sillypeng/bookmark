import { SHA256 } from 'crypto-js'
import {userDB, websiteDB} from './pouchdb'
import 'babel-polyfill'


const excludes = [
    "",
    "Barre de favoris", "Autres favoris",
    "Bookmarks bar", "Other bookmarks",
]


const syncTree = async nodes => {
    let TAGS = readTags(nodes);
    let bookmarks = readBookmarks(nodes, TAGS);
    let entries = bookmarks.map(({ id, tags }) => ({ _id: id, tags }));
    let websites = bookmarks.map(({ id, url, title }) => ({ _id: id, url, title }));
    let entry_keys = entries.map(e => e._id);
    try {
        let checkEntries = await userDB.allDocs({ keys: entry_keys });
        let eids_to_add = checkEntries.rows.filter(e => e.error === "not_found").map(e => e.key);
        console.log(eids_to_add);
        let entries_to_add = entries.filter(entry => eids_to_add.includes(entry._id));
        await userDB.bulkDocs(entries_to_add);
        let website_keys = websites.map(e => e._id);
        let checkWebsites = await websiteDB.allDocs({ keys: website_keys });
        let wids_to_add = checkWebsites.rows.filter(e => e.error === "not_found").map(e => e.key);
        console.log(wids_to_add);
        let websites_to_add = websites.filter(e => wids_to_add.includes(e._id));
        await websiteDB.bulkDocs(websites_to_add);
    }
    catch (e) {
        console.log(e);
    }
}

const readBookmarks = (nodes, TAGS) => {
    let result = [];
    for (let node of nodes) {
        if (node.children) {
            result = result.concat(readBookmarks(node.children, TAGS));
        }
        else {
            let bookmark = {
                id: SHA256(node.url).toString(),
                title: node.title,
                url: node.url,
                tags: []
            }
            if (TAGS[node.parentId]) {
                bookmark.tags.push(TAGS[node.parentId]);
            }
            result.push(bookmark);
        }
    }
    return result
}



const readTags = nodes => {
    let tags = {};
    for (let node of nodes) {
        if (node.children) {
            tags = { ...tags, ...readTags(node.children) };
            if (!excludes.includes(node.title)) {
                tags[node.id] = node.title;
            }
        }
    }
    return tags;
}

export {syncTree}