import PouchDB from 'pouchdb'

const websites = 'cc586e0f2585efe53943a98eb4215895449e1c86aa680515af6bbdb82e734038';
const uid = '88ff242d1f0ba789832740ba2ef2af7e535acb7a01d6cb5d92294233c3d03403'
const userDB  = new PouchDB(`http://nexusentry.hopto.org/u${uid}`);
const websiteDB = new PouchDB(`http://nexusentry.hopto.org/w${websites}`);

export {userDB, websiteDB}