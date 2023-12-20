import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Platform,
  Text,
  TextInput,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
  type TextStyle,
  Keyboard,
  TouchableWithoutFeedback,
  I18nManager,
} from 'react-native';

import ShowHide from './ShowHideButton';
import styles from './styles';
import {
  NIPinTypeEnum,
  NILabels,
  NIThemeEnum,
} from '../../interfaces/NiInputInterfaces';
import { type NICapturePin } from '../../interfaces/NiInterfaces';
import { themeColors } from '../../config/themeColors';

export default function CapturePin({
  setPin: { pin, setPin, initialPin, pinEditable },
  setNextStep: { step, setNextStep, onConfirmPin },
  pinType,
  title,
  pinLabel,
  wrongPinLabel,
  pinLabelIndex,
  showHideLabels,
  theme,
  input,
  showPin,
}: NICapturePin): JSX.Element {
  const [isShowHide, setIsShowHide] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const [keyboardWillShow, setKeyboardWillShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardWillShow(false);
    });
    Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardWillShow(true);
    });
  }, []);

  const pinLength =
    pinType === NIPinTypeEnum.dynamicFourToSix
      ? NIPinTypeEnum.sixDigits
      : pinType;

  const pinChars = [
    ...[...(pin.length ? pin.toString() : '').padEnd(pinLength, ' ')].join('|'),
  ];

  const pinInputError = {
    color: 'red',
  };

  function handleKeyPress(
    event: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) {
    const key = event.nativeEvent.key.toLowerCase();
    pin.length < pinLength &&
      ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(key) &&
      setPin(pin + key);
    ['backspace'].includes(key) && setPin(pin.substring(0, pin.length - 1));
  }

  const isPinDone =
    pinType === NIPinTypeEnum.dynamicFourToSix
      ? pin.length >= NIPinTypeEnum.fourDigits
      : pin.length === pinLength;
  const isErrorPin = initialPin && isPinDone && initialPin !== pin;
  function onSubmitEditing() {
    if (isPinDone && !isErrorPin) {
      onConfirmPin && onConfirmPin();
      setNextStep && setNextStep(++step);
    } else {
      Keyboard.dismiss;
    }
  }

  const labelFonts =
    input &&
    input.displayAttributes &&
    input.displayAttributes.fonts &&
    input.displayAttributes.fonts.filter(
      (item) => item.label === pinLabelIndex
    );
  let font = labelFonts && labelFonts.length && labelFonts[0]?.font;
  font = font || { name: 'Helvetica', size: 17 };

  const pinInputStyle: TextStyle = {
    width:
      pinType === NIPinTypeEnum.fourDigits
        ? '14%'
        : pinType === NIPinTypeEnum.fiveDigits
        ? '11%'
        : '9%',
    color:
      theme === NIThemeEnum.light
        ? themeColors.light.color
        : themeColors.dark.color,
  };
  const pinInputBorder: TextStyle = {
    borderColor:
      theme === NIThemeEnum.light
        ? themeColors.light.color
        : themeColors.dark.color,
  };
  const titleStyle: TextStyle = {
    color:
      theme === NIThemeEnum.light
        ? themeColors.light.color
        : themeColors.dark.color,
    fontSize: font.size,
    fontFamily: font.name,
    fontWeight: 'bold',
  };
  const pinLabelStyle: TextStyle = {
    color:
      theme === NIThemeEnum.light
        ? themeColors.light.color
        : themeColors.dark.color,
    fontSize: font.size,
    fontFamily: font.name,
  };
  const viewPinCapturePinSectionSizes: TextStyle =
    pinLabelIndex === NILabels.viewPinDescriptionLabel
      ? {
          height: undefined,
          width: undefined,
        }
      : {};
  const viewPinPinInputViewTopMargin: TextStyle =
    pinLabelIndex === NILabels.viewPinDescriptionLabel
      ? {
          marginTop: undefined,
        }
      : {};
  const keyboardAppearance =
    theme === NIThemeEnum.light ? NIThemeEnum.light : NIThemeEnum.dark;

  return (
    <View style={[styles.capturePinSection, viewPinCapturePinSectionSizes]}>
      {pinLabelIndex !== NILabels.viewPinDescriptionLabel && (
        <View style={styles.titleSection}>
          <Text style={titleStyle}>{title}</Text>
        </View>
      )}
      <View style={styles.pinSection}>
        {pinLabelIndex !== NILabels.viewPinDescriptionLabel && (
          <Text style={[pinLabelStyle, isErrorPin ? pinInputError : {}]}>
            {isErrorPin ? wrongPinLabel : pinLabel}
          </Text>
        )}
        <TouchableWithoutFeedback>
          <View
            style={[
              styles.pinInputView,
              pinInputBorder,
              viewPinPinInputViewTopMargin,
              I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
            ]}
            onTouchEnd={() => {
              const isIos = Platform.OS === 'ios';
              if (!Keyboard.isVisible()) {
                if (isIos && keyboardWillShow) {
                  return;
                }
                Keyboard.dismiss();
                inputRef.current?.focus();
              }
            }}
          >
            {pinChars.map((pinChar: string, index: number) => (
              <TextInput
                ref={inputRef}
                onLayout={() => {
                  index === 0 && inputRef.current && inputRef.current.focus();
                }}
                editable={
                  pinLabelIndex === NILabels.viewPinDescriptionLabel
                    ? false
                    : pinEditable && index === 2 * (pinLength - 1)
                }
                key={index}
                placeholder={''}
                style={[
                  styles.pinInput,
                  pinInputStyle,
                  isErrorPin && !(index % 2) ? pinInputError : {},
                ]}
                inputMode="decimal"
                keyboardType="numeric"
                textAlign="center"
                caretHidden={true}
                value={
                  index % 2 || pinChar === ' ' || isShowHide || showPin
                    ? pinChar
                    : '*'
                }
                onKeyPress={(event) => handleKeyPress(event)}
                onSubmitEditing={onSubmitEditing}
                maxLength={1}
                keyboardAppearance={keyboardAppearance}
              />
            ))}
          </View>
        </TouchableWithoutFeedback>
        {pinLabelIndex !== NILabels.viewPinDescriptionLabel && (
          <ShowHide
            setShowHide={{ isShowHide, setIsShowHide }}
            showHideLabels={showHideLabels}
            theme={theme}
          />
        )}
      </View>
    </View>
  );
}
