import React from 'react';

import { NIPinTypeEnum, NIThemeEnum } from '../interfaces/NiInputInterfaces';
import { type NIVerifyPinView } from '../interfaces/NiInterfaces';
import { useVerifyPin } from '../hooks/useVerifyPin';
import VerifyPin from '../components/VerifyPin/VerifyPin';
import PinState from '../components/PinState/PinState';

function VerifyPinView({
  input,
  type,
  callback,
}: NIVerifyPinView): JSX.Element {
  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;

  const _pinType = type || NIPinTypeEnum.dynamicFourToSix;
  const pinType = [0, 4, 5, 6].includes(type || NIPinTypeEnum.dynamicFourToSix)
    ? _pinType
    : NIPinTypeEnum.dynamicFourToSix;

  const {
    result: verifyPinResult,
    isLoading: isVerifyPinLoading,
    onVerifyPin,
  } = useVerifyPin();

  return (
    <>
      <VerifyPin
        input={input}
        pinType={pinType}
        result={verifyPinResult}
        isLoading={isVerifyPinLoading}
        onVerifyPin={onVerifyPin}
        callback={callback}
      />
      <PinState isLoading={isVerifyPinLoading} theme={theme} />
    </>
  );
}

export { VerifyPinView, useVerifyPin };
