import React, { useEffect } from 'react';
import { type TextStyle, View } from 'react-native';

import { NIPinTypeEnum, NIThemeEnum } from '../interfaces/NiInputInterfaces';
import { type NIViewPinView } from '../interfaces/NiInterfaces';
import { useViewPin } from '../hooks/useViewPin';
import PinState from '../components/PinState/PinState';
import ViewPin from '../components/ViewPin/ViewPin';

function ViewPinView({
  input,
  type: pinType,
  callback,
}: NIViewPinView): JSX.Element {
  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;
  const countdownTime = input?.timer;

  const viewPinStyle: TextStyle = {
    backgroundColor: 'darkgray',
    height: '100%',
    alignItems: 'center',
    paddingTop: 200,
  };

  const {
    result: viewPinResult,
    error: viewPinError,
    isLoading: isViewPinLoading,
    onViewPin,
  } = useViewPin();

  (!!viewPinResult || !!viewPinError) &&
    console.log('ViewPinView', {
      viewPinResult,
      viewPinError,
      isViewPinLoading,
    });

  useEffect(() => {
    input && onViewPin(input, callback);
  }, []);

  return (
    <View style={viewPinStyle}>
      <ViewPin
        input={input}
        pinType={pinType || NIPinTypeEnum.dynamicFourToSix}
        result={viewPinResult || ''}
        countdownTime={countdownTime || 0}
      />
      <PinState isLoading={isViewPinLoading} theme={theme} />
    </View>
  );
}

export { ViewPinView };
