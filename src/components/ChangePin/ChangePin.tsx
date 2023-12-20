import React, { useEffect, useState } from 'react';
import {
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  type TextStyle,
  I18nManager,
} from 'react-native';

import {
  NIThemeEnum,
  NILanguageEnum,
  NIPinTypeEnum,
} from '../../interfaces/NiInputInterfaces';
import { NIStepEnum, type NIChangePin } from '../../interfaces/NiInterfaces';
import CaptureCurrentPin from './CaptureCurrentPin';
import CaptureNewPin from './CaptureNewPin';
import ReenterNewPin from './ReenterNewPin';
import NextButton from '../Pin/NextButton';
import ConfirmPin from './ConfirmPin';
import styles from './styles';
import { themeColors } from '../../config/themeColors';

function ChangePin({
  input,
  pinType,
  result,
  isLoading,
  onChangePin,
  callback,
}: NIChangePin): JSX.Element {
  const [currentPin, setCurrentPin] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [confirmationPin, setConfirmationPin] = useState<string>('');
  const [step, setNextStep] = useState(NIStepEnum.currentPinStep);
  const [pinEditable, setPinEditable] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [initialKeyboardHeight, setInitialKeyboardHeight] = useState<number>(0);
  const language =
    (input?.displayAttributes?.language as string) || NILanguageEnum.english;
  const theme = input?.displayAttributes?.theme || NIThemeEnum.light;

  const container: TextStyle = {
    backgroundColor:
      theme === NIThemeEnum.light
        ? themeColors.light.background
        : themeColors.dark.background,
    paddingBottom: Platform.OS === 'ios' ? keyboardHeight : 0,
  };

  const isVisibleConfirmationButtonStep = step === NIStepEnum.reEnterPinStep;
  const isVisibleConfirmationButton =
    isVisibleConfirmationButtonStep && pin === confirmationPin;
  const disabled = !isVisibleConfirmationButton || isLoading || !!result;

  const pinLength =
    pinType === NIPinTypeEnum.dynamicFourToSix
      ? NIPinTypeEnum.sixDigits
      : pinType;

  const _pin = step === NIStepEnum.currentPinStep ? currentPin : pin;
  const isPinDone =
    pinType === NIPinTypeEnum.dynamicFourToSix
      ? _pin.length >= NIPinTypeEnum.fourDigits
      : _pin.length === pinLength;
  function onConfirmPin() {
    !disabled &&
      input &&
      onChangePin &&
      onChangePin(currentPin as string, pin, input, callback);
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
        <CaptureCurrentPin
          setPin={{ currentPin, setCurrentPin, pinEditable }}
          setNextStep={{ step, setNextStep }}
          pinType={pinType}
          language={language}
          theme={theme}
          input={input}
        />
        <CaptureNewPin
          setPin={{ pin, setPin, pinEditable }}
          setNextStep={{ step, setNextStep }}
          pinType={pinType}
          language={language}
          theme={theme}
          input={input}
        />
        <ReenterNewPin
          setPin={{
            confirmationPin,
            setConfirmationPin,
            pin,
            pinEditable,
          }}
          setNextStep={{ step, onConfirmPin }}
          pinType={pinType}
          language={language}
          theme={theme}
          input={input}
        />
        {!isVisibleConfirmationButtonStep && (
          <View
            style={[
              styles.capturePinSection,
              I18nManager.isRTL ? { flexDirection: 'row' } : {},
            ]}
          >
            <NextButton
              setNextStep={{ step, setNextStep }}
              disabled={!isPinDone}
              theme={theme}
            />
          </View>
        )}
        {isVisibleConfirmationButtonStep && (
          <ConfirmPin
            language={language}
            theme={theme}
            disabled={!pinEditable || disabled}
            onConfirmPin={onConfirmPin}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ChangePin;
