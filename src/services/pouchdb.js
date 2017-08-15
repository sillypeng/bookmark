import PouchDB from 'pouchdb'

const websites = 'cc586e0f2585efe53943a98eb4215895449e1c86aa680515af6bbdb82e734038';
const uid = '88ff242d1f0ba789832740ba2ef2af7e535acb7a01d6cb5d92294233c3d03403'
const userDB  = new PouchDB(`http://nexusentry.hopto.org/u${uid}`);
const websiteDB = new PouchDB(`http://nexusentry.hopto.org/w${websites}`);

// let userDoc = await userDB.allDocs({ include_docs: true });
// let entries = userDoc.rows.map(row => row.doc);
// let websites = await websiteDB.allDocs({ include_docs: true, keys: entries.map(entry => entry._id) });
// let bookmarks = entries.map((entry, i) => ({ ...websites.rows[i].doc, ...entry }))