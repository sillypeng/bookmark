import {FETCH_BOOKMARKS} from '../ActionTypes'
import PouchDB from 'pouchdb'

const websites = 'test2';
const uid = 'test'
const userDB  = new PouchDB(`http://localhost:5984/u${uid}`);
const websiteDB = new PouchDB(`http://localhost:5984/w${websites}`);

export function reducer(state = [], action) {
    let { type, bookmarks } = action;
    switch (type) {
        case FETCH_BOOKMARKS:
            return bookmarks;
        default:
            return state;
    }
}

export const fetchBookmarks = () => async dispatch => {
    try {
        let userDoc = await userDB.allDocs({ include_docs: true });
        let entries = userDoc.rows.map(row => row.doc);
        let websites = await websiteDB.allDocs({ include_docs: true, keys: entries.map(entry => entry._id) });
        let bookmarks = entries.map((entry, i) => ({ ...websites.rows[i].doc, ...entry }))
        dispatch({
            type: FETCH_BOOKMARKS,
            bookmarks
        })
    }
    catch (e) {
        console.log('error', e);
    }
}


