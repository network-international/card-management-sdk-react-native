import React, { useEffect, useState } from 'react';
import {
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  type TextStyle,
} from 'react-native';

import {
  NILanguageEnum,
  NIPinTypeEnum,
  NIThemeEnum,
} from '../../interfaces/NiInputInterfaces';
import { NIStepEnum, type NIVerifyPin } from '../../interfaces/NiInterfaces';
import CaptureVerifyPin from './CaptureVerifyPin';
import ConfirmPin from './ConfirmPin';
import styles from './styles';
import { themeColors } from '../../config/themeColors';

function VerifyPin({
  pinType,
  input,
  result,
  isLoading,
  onVerifyPin,
  callback,
}: NIVerifyPin): JSX.Element {
  const [pin, setPin] = useState<string>('');
  const [step, setNextStep] = useState(NIStepEnum.verifyStep);
  const [pinEditable, setPinEditable] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [initialKeyboardHeight, setInitialKeyboardHeight] = useState<number>(0);

  const { displayAttributes } = input || {};
  const language =
    (displayAttributes?.language as string) || NILanguageEnum.english;
  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;

  const container: TextStyle = {
    backgroundColor:
      theme === NIThemeEnum.light
        ? themeColors.light.background
        : themeColors.dark.background,
    paddingBottom: Platform.OS === 'ios' ? keyboardHeight : 0,
  };

  const isVisibleConfirmationButton = step === NIStepEnum.verifyStep;
  const disabled = !isVisibleConfirmationButton || isLoading || !!result;

  const pinLength =
    pinType === NIPinTypeEnum.dynamicFourToSix
      ? NIPinTypeEnum.sixDigits
      : pinType;
  const isPinDone =
    pinType === NIPinTypeEnum.dynamicFourToSix
      ? pin.length >= NIPinTypeEnum.fourDigits
      : pin.length === pinLength;
  function onConfirmPin() {
    !disabled && input && onVerifyPin && onVerifyPin(pin, input, callback);
    setPinEditable(false);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      const metrics = Keyboard.metrics();
      if (!initialKeyboardHeight) {
        setInitialKeyboardHeight(metrics?.height || 0);
      }

      setKeyboardHeight(metrics?.height || 0);
    });
    Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
    Keyboard.addListener('keyboardWillShow', () => {
      if (initialKeyboardHeight) {
        setKeyboardHeight(initialKeyboardHeight);
      }
    });
  }, [initialKeyboardHeight]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, container]}>
        <CaptureVerifyPin
          setPin={{ pin, setPin, pinEditable }}
          setNextStep={{ step, setNextStep, onConfirmPin }}
          pinType={pinType}
          language={language}
          theme={theme}
          input={input}
        />
        <ConfirmPin
          language={language}
          theme={theme}
          disabled={!pinEditable || !isPinDone}
          onConfirmPin={onConfirmPin}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

export default VerifyPin;
