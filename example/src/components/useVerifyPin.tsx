import * as React from 'react';
import { ActivityIndicator, type TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import {
  useVerifyPin,
  type NIErrorResponse,
  NIThemeEnum,
} from '@networkinternational/ni-card-management-sdk';
import { TEST_INPUT, cardInput } from '../config/config';

interface UseVerifyPinHookInterface {
  callback: () => void;
}
export const UseVerifyPinHook = ({
  callback,
}: UseVerifyPinHookInterface): JSX.Element => {
  React.useEffect(
    () =>
      onVerifyPin(
        '1234',
        cardInput,
        (error: NIErrorResponse | null, result: string | null = null) => {
          console.log('onVerifyPin example', { error, result });
          callback();
        }
      ),
    []
  );

  const {
    // result: verifyPinResult,
    // error: verifyPinError,
    isLoading,
    onVerifyPin,
  } = useVerifyPin();

  // (!!verifyPinResult || !!verifyPinError) &&
  //   console.log('useVerifyPin hook', {
  //     verifyPinResult,
  //     verifyPinError,
  //     isLoading,
  //   });

  const theme = TEST_INPUT.displayAttributes?.theme;
  const textMain: TextStyle = {
    color: theme === NIThemeEnum.dark ? 'white' : 'black',
  };

  return (
    <>
      <Text style={[styles.textMain, textMain]} onPress={callback}>
        useVerifyPinHook demo
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
