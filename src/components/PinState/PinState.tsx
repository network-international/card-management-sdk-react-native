import React from 'react';
import { type TextStyle, View } from 'react-native';

import LoadingState from './LoadingState';

function PinState({
  isLoading,
  theme,
  isCardDetails,
}: {
  isLoading: boolean;
  theme: string;
  isCardDetails?: boolean;
}): JSX.Element {
  const pinState: TextStyle = isCardDetails
    ? {}
    : {
        position: 'absolute',
        width: '100%',
      };

  return (
    <View style={pinState}>
      <LoadingState
        isLoading={isLoading}
        theme={theme}
        isCardDetails={isCardDetails}
      />
    </View>
  );
}

export default PinState;
