import React from 'react';

import { NIPinTypeEnum, NIThemeEnum } from '../interfaces/NiInputInterfaces';
import { type NIChangePinView } from '../interfaces/NiInterfaces';
import { useChangePin } from '../hooks/useChangePin';
import ChangePin from '../components/ChangePin/ChangePin';
import PinState from '../components/PinState/PinState';

function ChangePinView({
  input,
  type,
  callback,
}: NIChangePinView): JSX.Element {
  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;

  const _pinType = type || NIPinTypeEnum.dynamicFourToSix;
  const pinType = [0, 4, 5, 6].includes(type || NIPinTypeEnum.dynamicFourToSix)
    ? _pinType
    : NIPinTypeEnum.dynamicFourToSix;

  const {
    result: changePinResult,
    isLoading: isChangePinLoading,
    onChangePin,
  } = useChangePin();

  return (
    <>
      <ChangePin
        input={input}
        pinType={pinType || NIPinTypeEnum.dynamicFourToSix}
        result={changePinResult}
        isLoading={isChangePinLoading}
        onChangePin={onChangePin}
        callback={callback}
      />
      <PinState isLoading={isChangePinLoading} theme={theme} />
    </>
  );
}
export { ChangePinView, useChangePin };
