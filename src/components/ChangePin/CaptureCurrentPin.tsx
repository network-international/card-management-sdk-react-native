import React from 'react';

import { NILabels } from '../../interfaces/NiInputInterfaces';
import {
  type NICurrentCardPin,
  NIStepEnum,
} from '../../interfaces/NiInterfaces';
import CapturePin from '../Pin/CapturePin';
import localLabels from '../../utils/localization';

export default function CaptureCurrentPin({
  setPin: { currentPin, setCurrentPin, pinEditable },
  setNextStep: { step, setNextStep },
  pinType,
  language,
  theme,
  input,
}: NICurrentCardPin): JSX.Element {
  return (
    <>
      {step === NIStepEnum.currentPinStep && (
        <CapturePin
          setPin={{ pin: currentPin, setPin: setCurrentPin, pinEditable }}
          setNextStep={{ step, setNextStep }}
          pinType={pinType}
          title={localLabels(language).changePinButtonLabel}
          pinLabel={localLabels(language).enterCurrentCardPin}
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
