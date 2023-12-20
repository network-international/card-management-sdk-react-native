import React from 'react';

import { NIPinTypeEnum, NIThemeEnum } from '../interfaces/NiInputInterfaces';
import { type NISetPinView } from '../interfaces/NiInterfaces';
import { useSetPin } from '../hooks/useSetPin';
import SetPin from '../components/SetPin/SetPin';
import PinState from '../components/PinState/PinState';

function SetPinView({ input, type, callback }: NISetPinView): JSX.Element {
  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;

  const _pinType = type || NIPinTypeEnum.dynamicFourToSix;
  const pinType = [0, 4, 5, 6].includes(type || NIPinTypeEnum.dynamicFourToSix)
    ? _pinType
    : NIPinTypeEnum.dynamicFourToSix;

  const {
    result: setPinResult,
    isLoading: isSetPinLoading,
    onSetPin,
  } = useSetPin();

  return (
    <>
      <SetPin
        input={input}
        pinType={pinType || NIPinTypeEnum.dynamicFourToSix}
        result={setPinResult}
        isLoading={isSetPinLoading}
        onSetPin={onSetPin}
        callback={callback}
      />
      <PinState isLoading={isSetPinLoading} theme={theme} />
    </>
  );
}

export { SetPinView, useSetPin };
