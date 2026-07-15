import React, { useEffect } from 'react';

import { NIPinTypeEnum, NIThemeEnum } from '../interfaces/NiInputInterfaces';
import { type NIViewPinComponent } from '../interfaces/NiInterfaces';
import { useViewPin } from '../hooks/useViewPin';
import PinState from '../components/PinState/PinState';
import ViewPin from '../components/ViewPin/ViewPin';

function ViewPinComponent({
  input,
  type: pinType,
  callback,
}: NIViewPinComponent): JSX.Element {
  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;
  const countdownTime = input?.timer;

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
    if (input) {
      onViewPin(input, callback);
    }
  }, [input, callback, onViewPin]);

  return (
    <>
      <ViewPin
        input={input}
        pinType={pinType || NIPinTypeEnum.dynamicFourToSix}
        result={viewPinResult || ''}
        countdownTime={countdownTime || 0}
      />
      <PinState isLoading={isViewPinLoading} theme={theme} />
    </>
  );
}

export { ViewPinComponent, useViewPin };
