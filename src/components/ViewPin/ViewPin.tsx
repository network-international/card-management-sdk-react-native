import React, { useEffect, useState } from 'react';
import { Text, type TextStyle, View } from 'react-native';

import styles from './styles';
import { themeColors } from '../../config/themeColors';
import {
  NILabels,
  NILanguageEnum,
  NIThemeEnum,
} from '../../interfaces/NiInputInterfaces';
import { type NIViewPin } from '../../interfaces/NiInterfaces';
import CapturePin from '../Pin/CapturePin';
import localLabels from '../../utils/localization';

function ViewPin({
  pinType,
  input,
  result,
  countdownTime,
}: NIViewPin): JSX.Element {
  const [showPin, setShowPin] = useState<boolean>(true);
  const [pinCount, setPinCount] = useState<number>(countdownTime);

  const { displayAttributes } = input || {};
  const language =
    (displayAttributes?.language as string) || NILanguageEnum.english;
  const theme = displayAttributes?.theme || NIThemeEnum.light;

  const countdownLabelFont =
    input &&
    input.displayAttributes &&
    input.displayAttributes.fonts &&
    input.displayAttributes.fonts.filter(
      (item) => item.label === NILabels.viewPinCountDownDescription
    );
  const countdownLabelStyle: TextStyle = {
    color:
      theme === NIThemeEnum.light
        ? themeColors.light.color
        : themeColors.dark.color,
    fontSize:
      countdownLabelFont === undefined || countdownLabelFont === null
        ? 17
        : countdownLabelFont[0]?.font.size,
    fontFamily:
      countdownLabelFont === undefined || countdownLabelFont === null
        ? 'Helvetica'
        : countdownLabelFont[0]?.font.name,
  };

  useEffect(() => {
    if (result && countdownTime > 0) {
      let counter = 0;
      let interval = setInterval(() => {
        setPinCount(countdownTime - 1 - counter);
        if (++counter > countdownTime - 1) {
          setShowPin(false);
          clearInterval(interval);
        }
      }, 1000);
    }
  }, [result, countdownTime]);

  return (
    <View style={styles.container}>
      {result && (
        <CapturePin
          setPin={{
            pin: result,
            setPin: (pin: string) => pin,
            pinEditable: false,
          }}
          setNextStep={{
            step: 0,
            setNextStep: (step: number) => step,
          }}
          pinType={pinType}
          title={''}
          pinLabel={''}
          pinLabelIndex={NILabels.viewPinDescriptionLabel}
          showHideLabels={{
            show: '',
            hide: '',
          }}
          theme={theme}
          input={input}
          showPin={showPin}
        />
      )}
      {!!result && !!pinCount && (
        <Text style={[styles.countdownLabelSection, countdownLabelStyle]}>
          {(localLabels(language).viewPinCountdownLabel as Function)(pinCount)}
        </Text>
      )}
    </View>
  );
}

export default ViewPin;
