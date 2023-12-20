import React from 'react';

import { NILabels } from '../../interfaces/NiInputInterfaces';
import {
  type NIReenterCardPin,
  NIStepEnum,
} from '../../interfaces/NiInterfaces';
import CapturePin from '../Pin/CapturePin';
import localLabels from '../../utils/localization';

export default function ReenterNewPin({
  setPin: { confirmationPin, setConfirmationPin, pin, pinEditable },
  setNextStep: { step, onConfirmPin },
  pinType,
  language,
  theme,
  input,
}: NIReenterCardPin): JSX.Element {
  return (
    <>
      {step === NIStepEnum.reEnterPinStep && (
        <CapturePin
          setPin={{
            pin: confirmationPin,
            setPin: setConfirmationPin,
            initialPin: pin,
            pinEditable,
          }}
          setNextStep={{ step, onConfirmPin }}
          pinType={pinType}
          title={localLabels(language).changePinButtonLabel}
          pinLabel={localLabels(language).confirmCardPIN}
          wrongPinLabel={localLabels(language).wrongCardPin}
          pinLabelIndex={NILabels.changePinDescriptionLabel}
          showHideLabels={{
            show: localLabels(language).show,
            hide: localLabels(language).hide,
          }}
          theme={theme}
          input={input}
        />
      )}
    </>
  );
}
