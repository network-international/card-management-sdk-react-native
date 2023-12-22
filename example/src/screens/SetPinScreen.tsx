import React, { useContext } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type SetPinProps = NativeStackScreenProps<RootStackParamList, 'SetPin'>;

import { SetPinView } from 'ni-card-management-sdk';
import { type RootStackParamList } from '../navigation/RootNavigator';
import { InputContext } from './ContextView';
import { NIErrorResponse } from 'ni-card-management-sdk';

function SetPinScreen({navigation, route}: SetPinProps): JSX.Element {
  const {inputData: input} = useContext(InputContext);
  const {type} = route.params;

  return (
    <SetPinView
      input={input}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null,
      ) => {
        console.log('SetPinScreen - callback', {error, result});
        navigation.goBack();
      }}
    />
  );
}

export default SetPinScreen;
