import HomePage from './HomePage'
import { connect } from 'react-redux'

const mapStateToProps = ({ bookmarks, searchText }) => ({
  bookmarks: searchText ?
    bookmarks.filter(bookmark => 
      RegExp(searchText, 'i').test(bookmark.title) || !!bookmark.tags.find(tag => RegExp(searchText, 'i').test(tag)))
    :
    bookmarks
})

export default connect(mapStateToProps)(HomePage);
