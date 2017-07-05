import React from 'react'
import {search} from '../reactions/search'
import Bookmark from './bookmark'
import { MuiThemeProvider } from 'material-ui/styles';
import {Input, Grid} from 'material-ui'

import { connect } from 'react-redux'

const App = ({bookmarks, searchText, search}) => (
  <MuiThemeProvider>
    <div>
      <Input placeholder='search' value={searchText} onChange={e => search(e.target.value)}/>
      <br/>
      {
        `${bookmarks.length} items`
      }
      <Grid container>
      {
        bookmarks.map(bookmark => (
            <Grid item xs={12} lg={6}>
              <Bookmark key={bookmark._id} bookmark={bookmark}/>
            </Grid>
          ))
      }
      </Grid>
    </div>
  </MuiThemeProvider>
)


const mapStateToProps = ({bookmarks, searchText}) => ({
  searchText,
  bookmarks: searchText ? bookmarks.filter(bookmark => RegExp(searchText, 'i').test(bookmark.title)) : bookmarks
})

export default connect(mapStateToProps, {search})(App);
