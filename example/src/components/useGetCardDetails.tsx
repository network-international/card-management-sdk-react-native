import * as React from 'react';
import { ActivityIndicator, type TextStyle } from 'react-native';
import { StyleSheet, Text } from 'react-native';

import {
  useGetCardDetails,
  type NIErrorResponse,
  NIThemeEnum,
} from '@networkinternational/ni-card-management-sdk';
import { TEST_INPUT, cardInput } from '../config/config';

interface UseGetCardDetailsHookInterface {
  callback: () => void;
}
export const UseGetCardDetailsHook = ({
  callback,
}: UseGetCardDetailsHookInterface): JSX.Element => {
  React.useEffect(
    () =>
      onGetCardDetails(
        cardInput,
        (error: NIErrorResponse | null, result: string | null = null) => {
          console.log('onGetCardDetails example', { error, result });
          callback();
        }
      ),
    []
  );

  const {
    result: getCardDetailsResult,
    error: getCardDetailsError,
    isLoading,
    onGetCardDetails,
  } = useGetCardDetails();

  (!!getCardDetailsResult || !!getCardDetailsError) &&
    console.log('useGetCardDetails hook', {
      getCardDetailsResult,
      getCardDetailsError,
      isLoading,
    });

  const theme = TEST_INPUT.displayAttributes?.theme;
  const textMain: TextStyle = {
    color: theme === NIThemeEnum.dark ? 'white' : 'black',
  };

  return (
    <>
      <Text style={[styles.textMain, textMain]} onPress={callback}>
        useGetCardDetailsHook demo
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
