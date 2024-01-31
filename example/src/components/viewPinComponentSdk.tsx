import * as React from 'react';

import {
  ViewPinComponent,
  type NIErrorResponse,
  NIPinTypeEnum,
  NIThemeEnum,
} from '@networkinternational/ni-card-management-sdk';

import { TEST_INPUT_VIEW_PIN } from '../config/config';
import { StyleSheet, Text, type TextStyle } from 'react-native';

interface ViewPinComponentSdkInterface {
  callback: () => void;
}
export function ViewPinComponentSdk({
  callback,
}: ViewPinComponentSdkInterface): JSX.Element {
  const theme = TEST_INPUT_VIEW_PIN.displayAttributes?.theme;
  const textMain: TextStyle = {
    color: theme === NIThemeEnum.dark ? 'white' : 'black',
  };
  const type = NIPinTypeEnum.fourDigits;
  return (
    <>
      <ViewPinComponent
        input={TEST_INPUT_VIEW_PIN}
        type={type}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
          console.log('ViewPinComponent', { error, result });
        }}
      />
      <Text style={[styles.textMain, textMain]} onPress={callback}>
        {`<    Main`}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  textMain: {
    position: 'absolute',
    top: 60,
    fontWeight: '700',
    fontSize: 24,
  },
});
