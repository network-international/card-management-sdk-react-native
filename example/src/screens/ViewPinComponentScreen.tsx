import React, { useContext } from 'react';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { type RootStackParamList } from '../navigation/RootNavigator';
import { InputContext } from './ContextView';
import {
  NIErrorResponse,
  ViewPinComponent,
} from '@networkinternational/ni-card-management-sdk';
import { View, type TextStyle } from 'react-native';

type ViewPinProps = NativeStackScreenProps<
  RootStackParamList,
  'ViewPinComponent'
>;

function ViewPinComponentScreen({ route }: ViewPinProps): JSX.Element {
  const { inputData: input } = useContext(InputContext);
  const { type } = route.params;

  const viewPinScreenStyle: TextStyle = {
    backgroundColor: 'darkgray',
    height: '100%',
    alignItems: 'center',
    paddingTop: 200,
  };

  return (
    <View style={viewPinScreenStyle}>
      <ViewPinComponent
        input={input}
        type={type}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
          console.log('ViewPinComponentScreen - callback', { error, result });
        }}
      />
    </View>
  );
}

export default ViewPinComponentScreen;
