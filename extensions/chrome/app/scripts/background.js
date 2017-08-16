// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';
import {syncTree} from './import'



chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion)
})

const sync = () => chrome.bookmarks.getTree(syncTree)


chrome.browserAction.onClicked.addListener(sync)