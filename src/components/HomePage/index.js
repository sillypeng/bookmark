import HomePage from './HomePage'
import { connect } from 'react-redux'

const mapStateToProps = ({bookmarks, searchText}) => ({
  bookmarks: searchText ? bookmarks.filter(bookmark => RegExp(searchText, 'i').test(bookmark.title)) : bookmarks
})

export default connect(mapStateToProps)(HomePage);
