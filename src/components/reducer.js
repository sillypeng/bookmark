import { combineReducers } from 'redux'
import {reducer as bookmarks} from './commons/FetchBookmarks'
import {reducer as searchText} from './Search'
import {reducer as route} from './Route'

export default combineReducers({
    bookmarks,
    searchText,
    route,
})