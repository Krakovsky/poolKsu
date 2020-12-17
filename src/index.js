import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './styles/index.scss';
import Main from './pages/Main/Main';
import configureStore from './redux/store';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
const rootElement = document.getElementById('root');

const Index = () => <Provider store={store}><Main /></Provider>;

ReactDOM.render(<Index />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
