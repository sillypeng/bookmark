import React from 'react'
import Favolink from '../Favolink'
import {Grid} from 'material-ui'
import Search from '../Search'

const HomePage = ({bookmarks}) => (
    <div>
      <Search/>
      <br/>
      {
        `${bookmarks.length} items`
      }
      <Grid container>
      {
        bookmarks.map(bookmark => (
            <Grid item xs={12} lg={6} key={bookmark._id}>
              <Favolink bookmark={bookmark}/>
            </Grid>
          ))
      }
      </Grid>
    </div>
)

export default HomePage