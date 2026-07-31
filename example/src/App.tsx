import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { InputProvider } from './screens/InputProvider';
import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <InputProvider>
        <RootNavigator />
      </InputProvider>
    </NavigationContainer>
  );
}
