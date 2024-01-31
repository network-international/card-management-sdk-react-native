import React from 'react';

import { NILabels } from '../../interfaces/NiInputInterfaces';
import {
  type NISetUpNewCardPin,
  NIStepEnum,
} from '../../interfaces/NiInterfaces';
import CapturePin from '../Pin/CapturePin';
import localLabels from '../../utils/localization';

export default function SetUpNewCardPin({
  setPin: { pin, setPin, pinEditable },
  setNextStep: { step, setNextStep },
  pinType,
  language,
  theme,
  input,
}: NISetUpNewCardPin): JSX.Element {
  return (
    <>
      {step === NIStepEnum.setupPinStep && (
        <CapturePin
          setPin={{ pin, setPin, pinEditable }}
          setNextStep={{ step, setNextStep }}
          pinType={pinType}
          title={localLabels(language).setPinButtonLabel}
          pinLabel={localLabels(language).enterNewCardPin}
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
