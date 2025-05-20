import React from 'react'; // used to import functionalities of react.
import ReactDOM from 'react-dom/client'; // used to render components in DOM
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
