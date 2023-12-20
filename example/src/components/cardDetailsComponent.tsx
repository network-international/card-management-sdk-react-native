import * as React from 'react';

import { StyleSheet, Text, View, type TextStyle } from 'react-native';
import {
  CardDetailsComponent,
  NIThemeEnum,
  type NIErrorResponse,
} from '@networkinternational/ni-card-management-sdk';

import { TEST_INPUT } from '../config/config';

interface CardDetailsComponentSdkInterface {
  callback: () => void;
}
export function CardDetailsComponentSdk({
  callback,
}: CardDetailsComponentSdkInterface): JSX.Element {
  const theme = TEST_INPUT.displayAttributes?.theme;
  const textMain: TextStyle = {
    color: theme === NIThemeEnum.dark ? 'white' : 'black',
  };
  return (
    <View style={styles.top}>
      <CardDetailsComponent
        input={TEST_INPUT}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
          console.log('CardDetailsComponent', { error, result });
        }}
      />
      <Text style={[styles.textMain, textMain]} onPress={callback}>
        {`<    Main`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textMain: {
    position: 'absolute',
    top: 20,
    fontWeight: '700',
    fontSize: 24,
  },
  top: {
    top: 40,
  },
});
