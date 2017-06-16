import React from 'react'
import {search} from '../reactions/search'
import Bookmark from './bookmark'

import { connect } from 'react-redux'

const App = ({bookmarks, searchText, search}) => (
  <div>
    <input type='text' label='Name' name='name' value={searchText} onChange={e => search(e.target.value)}/>
    <br/>
    {
      `${bookmarks.length} items`
    }
    {
      bookmarks.map(bookmark => <Bookmark key={bookmark._id} bookmark={bookmark}/>)
    }
  </div>
)


const mapStateToProps = ({bookmarks, searchText}) => ({
  searchText,
  bookmarks: searchText ? bookmarks.filter(bookmark => RegExp(searchText, 'i').test(bookmark.title)) : bookmarks
})

export default connect(mapStateToProps, {search})(App);
