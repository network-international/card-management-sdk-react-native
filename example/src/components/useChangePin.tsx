import * as React from 'react';
import { ActivityIndicator, type TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import {
  useChangePin,
  type NIErrorResponse,
  NIThemeEnum,
} from '@networkinternational/ni-card-management-sdk';
import { TEST_INPUT, cardInput } from '../config/config';

interface UseChangePinHookInterface {
  callback: () => void;
}
export const UseChangePinHook = ({
  callback,
}: UseChangePinHookInterface): JSX.Element => {
  React.useEffect(
    () =>
      onChangePin(
        '1234',
        '7890',
        cardInput,
        (error: NIErrorResponse | null, result: string | null = null) => {
          console.log('onChangePin example', { error, result });
          callback();
        }
      ),
    []
  );

  const {
    // result: changePinResult,
    // error: changePinError,
    isLoading,
    onChangePin,
  } = useChangePin();

  // (!!changePinResult || !!changePinError) &&
  //   console.log('useChangePin hook', {
  //     changePinResult,
  //     changePinError,
  //     isLoading,
  //   });

  const theme = TEST_INPUT.displayAttributes?.theme;
  const textMain: TextStyle = {
    color: theme === NIThemeEnum.dark ? 'white' : 'black',
  };

  return (
    <>
      <Text style={[styles.textMain, textMain]} onPress={callback}>
        useChangePinHook demo
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
