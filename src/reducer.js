import { combineReducers } from 'redux'
import {reducer as bookmarks} from './services/FetchBookmarks'
import {reducer as searchText} from './components/Search'

export default combineReducers({bookmarks, searchText})