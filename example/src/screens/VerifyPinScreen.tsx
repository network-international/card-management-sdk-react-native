import React, { useContext } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  VerifyPinView,
  NIErrorResponse,
} from '@networkinternational/ni-card-management-sdk';
import { type RootStackParamList } from '../navigation/RootNavigator';
import { InputContext } from './ContextView';

type VerifyPinProps = NativeStackScreenProps<RootStackParamList, 'VerifyPin'>;

function VerifyPinScreen({ navigation, route }: VerifyPinProps): JSX.Element {
  const { inputData: input } = useContext(InputContext);
  const { type } = route.params;

  return (
    <VerifyPinView
      input={input}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        console.log('VerifyPinScreen - callback', { error, result });
        navigation.goBack();
      }}
    />
  );
}

export default VerifyPinScreen;
