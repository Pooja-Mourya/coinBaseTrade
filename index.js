import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import {Provider} from 'react-redux'; // Import Provider
import store from './src/redux/store';
import {WalletProvider} from './src/hooks/WalletProvider';

const ReduxApp = () => (
  <Provider store={store}>
    <WalletProvider>
      <App />
    </WalletProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
