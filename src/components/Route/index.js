import Route from './Route'
import * as Actions from '../ActionTypes'
import { connect } from 'react-redux'

export const routeTo = route => ({
    type: Actions.ROUTETO,
    route
})


export default connect(
    ({route}) => ({route})
)(Route)

export function reducer(state = 'home', action){
    let {type, route} = action;
    if(type === Actions.ROUTETO){
        return route;
    }
    return state;
}
