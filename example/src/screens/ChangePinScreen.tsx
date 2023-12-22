import React, { useContext } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ChangePinView } from 'ni-card-management-sdk';
import { type RootStackParamList } from '../navigation/RootNavigator';
import { InputContext } from './ContextView';
import { type NIErrorResponse } from 'ni-card-management-sdk';

type ChangePinProps = NativeStackScreenProps<RootStackParamList, 'ChangePin'>;

function ChangePinScreen({navigation, route}: ChangePinProps): JSX.Element {
  const {inputData: input} = useContext(InputContext);
  const {type} = route.params;

  return (
    <ChangePinView
      input={input}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null,
      ) => {
        console.log('ChangePinScreen - callback', {error, result});
        navigation.goBack();
      }}
    />
  );
}

export default ChangePinScreen;
