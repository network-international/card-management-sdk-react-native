import React, { useContext } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type SetPinProps = NativeStackScreenProps<RootStackParamList, 'SetPin'>;

import {
  SetPinView,
  NIErrorResponse,
} from '@networkinternational/ni-card-management-sdk';
import { type RootStackParamList } from '../navigation/RootNavigator';
import { InputContext } from './ContextView';

function SetPinScreen({ navigation, route }: SetPinProps): JSX.Element {
  const { inputData: input } = useContext(InputContext);
  const { type } = route.params;

  return (
    <SetPinView
      input={input}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        console.log('SetPinScreen - callback', { error, result });
        navigation.goBack();
      }}
    />
  );
}

export default SetPinScreen;
