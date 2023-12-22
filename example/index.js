import * as React from 'react';

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

const theme = {
  colors: {},
};

AppRegistry.registerComponent(appName, () => Main);
