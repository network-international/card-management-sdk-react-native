import React, { useEffect } from 'react';
import { StyleSheet, type TextStyle, View } from 'react-native';

import type { NICardDetailsComponent } from '../interfaces/NiInterfaces';
import { CardDetails } from '../components/CardDetails/CardDetails';
import PinState from '../components/PinState/PinState';
import { useGetCardDetails } from '../hooks/useGetCardDetails';
import { NIThemeEnum } from '../interfaces/NiInputInterfaces';
import type { NIGetCardSuccessResponse } from '../interfaces/NiCardManagementInterfaces';
import { themeColors } from '../config/themeColors';

function CardDetailsComponent({
  input,
  callback,
}: NICardDetailsComponent): JSX.Element {
  const { displayAttributes } = input || {};
  const theme = displayAttributes?.theme || NIThemeEnum.light;
  const cardDetailsStyle: TextStyle = {
    height: '100%',
    width: '100%',
    backgroundColor:
      theme === NIThemeEnum.light
        ? themeColors.light.background
        : themeColors.dark.background,
  };

  const {
    result: getCardDetailsResult,
    error: getCardDetailsError,
    isLoading: getCardDetailsIsLoading,
    onGetCardDetails,
  } = useGetCardDetails();

  useEffect(() => {
    input && onGetCardDetails(input, callback);
  }, []);

  const error_getCardDetailsResult: NIGetCardSuccessResponse = {
    clearPan: '-',
    maskedPan: '-',
    expiry: '-',
    clearCVV2: '-',
    cardholderName: '-',
  };
  return (
    <View style={cardDetailsStyle}>
      <View style={styles.cardDetailsStyle}>
        <CardDetails
          displayAttributes={displayAttributes}
          getCardDetailsResult={
            !getCardDetailsError
              ? getCardDetailsResult
              : error_getCardDetailsResult
          }
          isError={!!getCardDetailsError}
        />
        <PinState
          isLoading={getCardDetailsIsLoading}
          theme={theme}
          isCardDetails={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardDetailsStyle: {
    marginTop: 60,
  },
});

export {
  CardDetailsComponent,
  useGetCardDetails,
  type NIGetCardSuccessResponse,
};
