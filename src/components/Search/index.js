import { connect } from 'react-redux'
import {SEARCH} from '../ActionTypes'
import Search from './Search'

const onChange = searchText => ({
    type: SEARCH,
    searchText
})

export default connect(
    ({ searchText }) => ({ searchText }),
    { onChange }
)(Search)


export function reducer(state = '', action) {
    let { type, searchText } = action;
    switch (type) {
        case SEARCH:
            return searchText;
        default:
            return state;
    }
}