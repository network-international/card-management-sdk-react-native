import * as React from 'react';

import {
  ViewPinView,
  type NIErrorResponse,
  NIPinTypeEnum,
  NIThemeEnum,
} from '@networkinternational/ni-card-management-sdk';

import { TEST_INPUT_VIEW_PIN } from '../config/config';
import { StyleSheet, Text, type TextStyle } from 'react-native';

interface ViewPinViewSdkInterface {
  callback: () => void;
}
export function ViewPinViewSdk({
  callback,
}: ViewPinViewSdkInterface): JSX.Element {
  const type = NIPinTypeEnum.fourDigits;
  const theme = TEST_INPUT_VIEW_PIN.displayAttributes?.theme;
  const textMain: TextStyle = {
    color: theme === NIThemeEnum.dark ? 'white' : 'black',
  };
  return (
    <>
      <ViewPinView
        input={TEST_INPUT_VIEW_PIN}
        type={type}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
          console.log('ViewPinView', { error, result });
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
