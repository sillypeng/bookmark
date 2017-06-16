import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reactions/reducer'
import { fetchBookmarks } from './reactions/bookmarks'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
<Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

  store.dispatch(fetchBookmarks())

registerServiceWorker();



