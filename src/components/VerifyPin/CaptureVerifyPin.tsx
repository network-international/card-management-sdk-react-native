import React from 'react';

import { NILabels } from '../../interfaces/NiInputInterfaces';
import {
  NIStepEnum,
  type NICaptureVerifyPin,
} from '../../interfaces/NiInterfaces';
import CapturePin from '../Pin/CapturePin';
import localLabels from '../../utils/localization';

export default function CaptureVerifyPin({
  setPin: { pin, setPin, pinEditable },
  setNextStep: { step, onConfirmPin },
  pinType,
  language,
  theme,
  input,
}: NICaptureVerifyPin): JSX.Element {
  return (
    <>
      {step === NIStepEnum.verifyStep && (
        <CapturePin
          setPin={{ pin, setPin: setPin, pinEditable }}
          setNextStep={{ step, onConfirmPin }}
          pinType={pinType}
          title={localLabels(language).verifyPinButtonLabel}
          pinLabel={localLabels(language).enterVerifyCardPin}
          pinLabelIndex={NILabels.setPinDescriptionLabel}
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
