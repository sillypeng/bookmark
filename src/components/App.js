import React from 'react'
import { MuiThemeProvider } from 'material-ui'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { fetchBookmarks } from './commons/FetchBookmarks'
import shortcut from '../services/shortcut'
import Route, {routeTo} from './Route'

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <Route/>
        </MuiThemeProvider>
    </Provider>
)


const switchRoute = () => (dispatch, getState) => {
    let {route} = getState();
    dispatch(routeTo(route === 'home' ? 'edit' : 'home'))
}

shortcut.add('Ctrl+Q', () => store.dispatch(switchRoute()))

store.dispatch(fetchBookmarks())


export default App