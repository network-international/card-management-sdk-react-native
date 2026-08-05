import React, { useEffect } from 'react';

import { NIPinTypeEnum, NIThemeEnum } from '../interfaces/NiInputInterfaces';
import { type NIViewPinComponent } from '../interfaces/NiInterfaces';
import { useViewPin } from '../hooks/useViewPin';
import PinState from '../components/PinState/PinState';
import ViewPin from '../components/ViewPin/ViewPin';
import { FeedbackPopup } from '../components/FeedbackPopup/FeedbackPopup';
import localLabels from '../utils/localization';

function ViewPinComponent({
  input,
  type: pinType,
  callback,
}: NIViewPinComponent): JSX.Element {
  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;
  const language = input?.displayAttributes?.language || 'english';
  const countdownTime = input?.timer;

  const {
    result: viewPinResult,
    error: viewPinError,
    isLoading: isViewPinLoading,
    onViewPin,
  } = useViewPin();

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
      <FeedbackPopup
        error={viewPinError}
        isLoading={isViewPinLoading}
        isSuccess={!!viewPinResult}
        language={language}
        successMessage={localLabels(language).viewPinSuccess}
        theme={theme}
      />
    </>
  );
}

export { ViewPinComponent, useViewPin };
