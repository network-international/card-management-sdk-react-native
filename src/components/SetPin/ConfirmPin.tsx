import React from 'react';
import { type TextStyle, View } from 'react-native';

import { NIThemeEnum } from '../../interfaces/NiInputInterfaces';
import { type NIConfirmPin } from '../../interfaces/NiInterfaces';
import { themeColors } from '../../config/themeColors';
import { NIButton } from '../NIButton/NIButton';
import styles from './styles';
import localLabels from '../../utils/localization';

export default function ConfirmPin({
  language,
  theme,
  disabled,
  onConfirmPin,
}: NIConfirmPin): JSX.Element {
  const buttonConfirmColorDisabled =
    theme === NIThemeEnum.light
      ? themeColors.light.buttonConfirmColorDisabled
      : themeColors.dark.buttonConfirmColorDisabled;
  const confirmButton: TextStyle = {
    backgroundColor: buttonConfirmColorDisabled,
    borderRadius: 20,
  };
  const confirmPinButtonsLinearGradientColors =
    theme === NIThemeEnum.light
      ? themeColors.light.confirmPinButtonsLinearGradientColors
      : themeColors.dark.confirmPinButtonsLinearGradientColors;

  const textColor =
    theme === NIThemeEnum.light
      ? themeColors.light.buttonConfirmTextColor
      : themeColors.dark.buttonConfirmTextColor;

  return (
    <View style={[styles.confirmButton, confirmButton]}>
      <NIButton
        title={localLabels(language).setPinButtonLabel}
        mode="text"
        disabled={disabled}
        textColor={textColor}
        colors={confirmPinButtonsLinearGradientColors}
        onPress={onConfirmPin}
      />
    </View>
  );
}
