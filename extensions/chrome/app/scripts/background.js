// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
import PouchDB from 'pouchdb'
import { SHA256 } from 'crypto-js'
import 'babel-polyfill'

const uid = "test"
const websites = "test2";
const userDB  = new PouchDB(`http://localhost:5984/u${uid}`);
const websiteDB = new PouchDB(`http://localhost:5984/w${websites}`);

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion)
})

const excludes = [
		"",
		"Barre de favoris", "Autres favoris",
		"Bookmarks bar", "Other bookmarks",
	]

const sync = () => chrome.bookmarks.getTree(syncTree)

const syncTree = async nodes => {
  let TAGS = readTags(nodes);
  let bookmarks = readBookmarks(nodes, TAGS);
  let entries = bookmarks.map(({id, tags}) =>({_id:id, tags}));
  let websites = bookmarks.map(({id, url, title}) =>({_id:id, url, title}));
  let entry_keys = entries.map(e => e._id);
  try {
    let checkEntries = await userDB.allDocs({keys: entry_keys});
    let eids_to_add = checkEntries.rows.filter(e => e.error === "not_found").map(e => e.key);
    console.log(eids_to_add);
    let entries_to_add = entries.filter(entry => eids_to_add.includes(entry._id));
    await userDB.bulkDocs(entries_to_add);
    let website_keys = websites.map(e => e._id);
    let checkWebsites = await websiteDB.allDocs({keys: website_keys});
    let wids_to_add = checkWebsites.rows.filter(e => e.error === "not_found").map(e => e.key);
    console.log(wids_to_add);
    let websites_to_add = websites.filter(e => wids_to_add.includes(e._id));
    await websiteDB.bulkDocs(websites_to_add);
  }
  catch(e) {
    console.log(e);
  }
}

const readBookmarks = (nodes, TAGS) => {
  let result = [];
  for (let node of nodes) {
    if (node.children) {
      result = result.concat(readBookmarks(node.children, TAGS));
    } else {
      let bookmark = {
        id : SHA256(node.url).toString(),
        title : node.title,
        url : node.url,
        tags : []
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
  for(let node of nodes){
    if(node.children){
      let tags = readTags(node.children);
      return excludes.includes(node.title) ? tags : {...tags, [node.id]: node.title}
    }
  }
}

chrome.browserAction.onClicked.addListener(sync)