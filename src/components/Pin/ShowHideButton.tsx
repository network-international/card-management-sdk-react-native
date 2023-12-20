import React from 'react';
import {
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  I18nManager,
} from 'react-native';

import styles from './styles';
import { themeColors } from '../../config/themeColors';
import { NIThemeEnum } from '../../interfaces/NiInputInterfaces';
import { type NIShowHideButton } from '../../interfaces/NiInterfaces';
import { PredeterminedIcon } from '../icons/PredeterminedIcon';

export default function ShowHide({
  setShowHide: { isShowHide, setIsShowHide },
  showHideLabels: { show, hide },
  theme,
}: NIShowHideButton): JSX.Element {
  const color =
    theme === NIThemeEnum.light
      ? themeColors.light.buttonShowHideTextColor
      : themeColors.dark.buttonShowHideTextColor;
  const showHideTextButton: TextStyle = {
    color: color,
  };

  return (
    <View
      style={[
        styles.showHideButton,
        I18nManager.isRTL ? { flexDirection: 'row' } : {},
      ]}
    >
      <TouchableOpacity onPress={() => setIsShowHide(!isShowHide)}>
        <View
          style={[
            styles.row,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
          <PredeterminedIcon
            name={isShowHide ? 'red-eye-off' : 'red-eye'}
            size={20}
          />
          {isShowHide && <Text style={showHideTextButton}>{hide}</Text>}
          {!isShowHide && <Text style={showHideTextButton}>{show}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
}
