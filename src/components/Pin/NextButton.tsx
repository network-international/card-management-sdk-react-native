import React from 'react';
import {
  TouchableOpacity,
  View,
  ImageBackground,
  type ImageURISource,
} from 'react-native';

import styles from './styles';
import { NIThemeEnum } from '../../interfaces/NiInputInterfaces';
import { type NINextButton, NIStepEnum } from '../../interfaces/NiInterfaces';

export default function NextButton({
  setNextStep: { step, setNextStep },
  disabled,
  theme,
}: NINextButton): JSX.Element {
  const nextButtonSource =
    theme === NIThemeEnum.light
      ? (require('../../assets/icons/icons8-arrow-100_1.png') as ImageURISource)
      : (require('../../assets/icons/icons8-arrow-100.png') as ImageURISource);

  const pinButtonStyle = {
    opacity: disabled ? 0.3 : 1,
  };
  const nextButtonStyle = {
    width: 50,
    height: 50,
    borderRadius: 20,
  };

  return (
    <>
      {(step === NIStepEnum.currentPinStep ||
        step === NIStepEnum.setupPinStep) && (
        <View style={[styles.pinButton, pinButtonStyle]}>
          <TouchableOpacity
            onPress={() => setNextStep && setNextStep(++step)}
            disabled={disabled}
          >
            <ImageBackground
              source={nextButtonSource}
              style={[styles.nextButton, nextButtonStyle]}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
