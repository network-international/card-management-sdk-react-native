import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { ViewPinView } from 'ni-card-management-sdk';
import { type RootStackParamList } from '../navigation/RootNavigator';
import { InputContext } from './ContextView';
import { NIErrorResponse } from 'ni-card-management-sdk';

type ViewPinProps = NativeStackScreenProps<RootStackParamList, 'ViewPin'>;

function ViewPinScreen({route}: ViewPinProps): JSX.Element {
  const {inputData: input} = useContext(InputContext);
  const {type} = route.params;

  return (
    <SafeAreaView style={{backgroundColor: 'darkgray'}}>
      <ViewPinView
        input={input}
        type={type}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null,
        ) => {
          console.log('ViewPinScreen - callback', {error, result});
        }}
      />
    </SafeAreaView>
  );
}

export default ViewPinScreen;
