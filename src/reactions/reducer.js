import { combineReducers } from 'redux'
import bookmarks from './bookmarks'
import searchText from './search'

export default combineReducers({bookmarks, searchText})