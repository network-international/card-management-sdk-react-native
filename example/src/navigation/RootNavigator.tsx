import React from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from '../screens/MainScreen';
import CardDetailsComponentScreen from '../screens/CardDetailsComponentScreen';
import SetPinScreen from '../screens/SetPinScreen';
import VerifyPinScreen from '../screens/VerifyPinScreen';
import ChangePinScreen from '../screens/ChangePinScreen';
import { InputContext } from '../screens/ContextView';
import { NIThemeEnum } from '@networkinternational/ni-card-management-sdk';
import ViewPinComponentScreen from '../screens/ViewPinComponentScreen';
import { getSampleThemeColors } from '../config/sampleTheme';

export type RootStackParamList = {
  Main: undefined;
  CardDetailsComponent: undefined;
  SetPin: { type: number };
  VerifyPin: { type: number };
  ChangePin: { type: number };
  ViewPinComponent: { type: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator(): JSX.Element {
  const { inputData: input } = React.useContext(InputContext);

  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;
  const colors = getSampleThemeColors(theme);
  const isDark = theme === NIThemeEnum.dark;

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: 'bold', color: colors.text },
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Main' }}
        />
        <Stack.Screen
          name="CardDetailsComponent"
          component={CardDetailsComponentScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="SetPin"
          component={SetPinScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="VerifyPin"
          component={VerifyPinScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="ChangePin"
          component={ChangePinScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="ViewPinComponent"
          component={ViewPinComponentScreen}
          options={{
            title: '',
          }}
        />
      </Stack.Navigator>
    </>
  );
}

export default RootNavigator;
