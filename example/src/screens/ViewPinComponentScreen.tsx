import React, { useContext } from 'react';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { type RootStackParamList } from '../navigation/RootNavigator';
import { InputContext } from './ContextView';
import { NIErrorResponse } from 'ni-card-management-sdk';
import { ViewPinComponent } from 'ni-card-management-sdk';

type ViewPinProps = NativeStackScreenProps<RootStackParamList, 'ViewPin'>;

function ViewPinComponentScreen({route}: ViewPinProps): JSX.Element {
  const {inputData: input} = useContext(InputContext);
  const {type} = route.params;

  return (
    <>
      <ViewPinComponent
        input={input}
        type={type}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null,
        ) => {
          console.log('ViewPinComponentScreen - callback', {error, result});
        }}
      />
    </>
  );
}

export default ViewPinComponentScreen;
