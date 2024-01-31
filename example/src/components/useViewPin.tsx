import * as React from 'react';
import { ActivityIndicator, type TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import {
  useViewPin,
  type NIErrorResponse,
  NIThemeEnum,
} from '@networkinternational/ni-card-management-sdk';
import { TEST_INPUT_VIEW_PIN, cardInput_VIEW_PIN } from '../config/config';

interface UseViewPinHookInterface {
  callback: () => void;
}
export const UseViewPinHook = ({
  callback,
}: UseViewPinHookInterface): JSX.Element => {
  React.useEffect(
    () =>
      onViewPin(
        cardInput_VIEW_PIN,
        (error: NIErrorResponse | null, result: string | null = null) => {
          console.log('onViewPin example', { error, result });
          callback();
        }
      ),
    []
  );

  const {
    result: viewPinResult,
    error: viewPinError,
    isLoading,
    onViewPin,
  } = useViewPin();

  (!!viewPinResult || !!viewPinError) &&
    console.log('useViewPin hook', {
      viewPinResult,
      viewPinError,
      isLoading,
    });

  const theme = TEST_INPUT_VIEW_PIN.displayAttributes?.theme;
  const textMain: TextStyle = {
    color: theme === NIThemeEnum.dark ? 'white' : 'black',
  };

  return (
    <>
      <Text style={[styles.textMain, textMain]} onPress={callback}>
        useViewPinHook demo
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
