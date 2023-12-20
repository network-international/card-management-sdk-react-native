import * as React from 'react';
import { StatusBar } from 'react-native';

import { NIThemeEnum } from '@networkinternational/ni-card-management-sdk';

import { TEST_INPUT } from './config/config';
import { NavigationContainer } from '@react-navigation/native';
import { InputProvider } from './screens/InputProvider';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  const isDarkMode = TEST_INPUT.displayAttributes?.theme !== NIThemeEnum.light;

  return (
    <NavigationContainer>
      <InputProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </InputProvider>
    </NavigationContainer>
  );
}
