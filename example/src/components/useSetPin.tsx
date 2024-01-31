import * as React from 'react';
import { ActivityIndicator, type TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import {
  useSetPin,
  type NIErrorResponse,
  NIThemeEnum,
} from '@networkinternational/ni-card-management-sdk';
import { TEST_INPUT, cardInput } from '../config/config';

interface UseSetPinHookInterface {
  callback: () => void;
}
export const UseSetPinHook = ({
  callback,
}: UseSetPinHookInterface): JSX.Element => {
  React.useEffect(
    () =>
      onSetPin(
        '1234',
        cardInput,
        (error: NIErrorResponse | null, result: string | null = null) => {
          console.log('onSetPin example', { error, result });
          callback();
        }
      ),
    []
  );

  const {
    // result: setPinResult,
    // error: setPinError,
    isLoading,
    onSetPin,
  } = useSetPin();

  // (!!setPinResult || !!setPinError) &&
  //   console.log('useSetPin hook', {
  //     setPinResult,
  //     setPinError,
  //     isLoading,
  //   });

  const theme = TEST_INPUT.displayAttributes?.theme;
  const textMain: TextStyle = {
    color: theme === NIThemeEnum.dark ? 'white' : 'black',
  };

  return (
    <>
      <Text style={[styles.textMain, textMain]} onPress={callback}>
        useSetPinHook demo
      </Text>

      {isLoading && <ActivityIndicator size="small" color="red" />}
    </>
  );
};

const styles = StyleSheet.create({
  textMain: {
    position: 'absolute',
    top: 60,
    fontWeight: '700',
    fontSize: 24,
  },
});
