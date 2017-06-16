import {SEARCH} from '../ActionTypes'

export default function reducer(state = '', action) {
    let {type, searchText} = action;
    switch(type){
        case SEARCH:
            return searchText;
        default:
            return state;
    }
}

export const search = searchText => ({
    type: SEARCH,
    searchText
})