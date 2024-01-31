import React from 'react';
import {
  type TextStyle,
  View,
  type ViewStyle,
  TouchableOpacity,
  Text,
  I18nManager,
} from 'react-native';

import {
  type NIFontLabelPair,
  NILanguageEnum,
  NIThemeEnum,
} from '../../interfaces/NiInputInterfaces';
import type { NICardDetailsDateCVVGroupOneRow } from '../../interfaces/NiInterfaces';
import { styles } from './styles';
import localLabels from '../../utils/localization';
import { HEIGHT_CARD } from '../../config/configCard';
import { themeColors } from '../../config/themeColors';
import { PredeterminedIcon } from '../icons/PredeterminedIcon';

export function CardDetailsDateCVVGroupOneRow({
  expiry,
  clearCVV2,
  pinLabelIndex,
  pinContentIndex,
  pinLabel1Index,
  pinContent1Index,
  cardDetailsVisible: { cardDetailsVisible, setCardDetailsVisible },
  shouldHide,
  displayAttributes,
  isError,
}: NICardDetailsDateCVVGroupOneRow): JSX.Element {
  const expiryRendered = isError
    ? expiry
    : !cardDetailsVisible
    ? expiry.replace(/(\d{2})/, '$&/')
    : '**/**';
  const clearCVV2Rendered = cardDetailsVisible
    ? clearCVV2.replace(/[0-9]/g, '*')
    : clearCVV2;
  const language =
    (displayAttributes?.language as string) || NILanguageEnum.english;

  const dateCVVContentGroupTopAlignment = Math.round(
    (displayAttributes?.cardAttributes?.textPositioning
      ?.dateCvvGroupTopAlignment || 0.6) * HEIGHT_CARD
  );
  const containerDateCVVContentGroupTopAlignmentStyle: ViewStyle = {
    position: 'absolute',
    top: dateCVVContentGroupTopAlignment,
    gap: 10,
  };

  const theme = displayAttributes?.theme || NIThemeEnum.light;
  const labelFonts = displayAttributes?.fonts?.filter(
    (item: NIFontLabelPair) => item.label === pinLabelIndex
  );
  let labelFont = labelFonts && labelFonts.length && labelFonts[0]?.font;
  labelFont = labelFont || { name: 'Helvetica', size: 17 };
  const labelStyleText: TextStyle = {
    color:
      theme === NIThemeEnum.light
        ? themeColors.light.colorCard
        : themeColors.dark.colorCard,
    fontSize: labelFont.size,
    fontFamily: labelFont.name,
  };

  const labelFonts1 = displayAttributes?.fonts?.filter(
    (item: NIFontLabelPair) => item.label === pinLabel1Index
  );
  let labelFont1 = labelFonts1 && labelFonts1.length && labelFonts1[0]?.font;
  labelFont1 = labelFont1 || { name: 'Helvetica', size: 17 };
  const labelStyleText1: TextStyle = {
    color:
      theme === NIThemeEnum.light
        ? themeColors.light.colorCard
        : themeColors.dark.colorCard,
    fontSize: labelFont1.size,
    fontFamily: labelFont1.name,
  };

  const textFonts = displayAttributes?.fonts?.filter(
    (item: NIFontLabelPair) => item.label === pinContentIndex
  );
  let textFont = textFonts && textFonts.length && textFonts[0]?.font;
  textFont = textFont || { name: 'Helvetica', size: 17 };
  const contentStyleText: TextStyle = {
    color:
      theme === NIThemeEnum.light
        ? themeColors.light.colorCard
        : themeColors.dark.colorCard,
    fontSize: textFont.size,
    fontFamily: textFont.name,
  };

  const textFonts1 = displayAttributes?.fonts?.filter(
    (item: NIFontLabelPair) => item.label === pinContent1Index
  );
  let textFont1 = textFonts1 && textFonts1.length && textFonts1[0]?.font;
  textFont1 = textFont1 || { name: 'Helvetica', size: 17 };
  const contentStyleText1: TextStyle = {
    color:
      theme === NIThemeEnum.light
        ? themeColors.light.colorCard
        : themeColors.dark.colorCard,
    fontSize: textFont1.size,
    fontFamily: textFont1.name,
  };

  return (
    <View
      style={[
        styles.containerDateCVVContentGroupTopAlignment,
        containerDateCVVContentGroupTopAlignmentStyle,
        I18nManager.isRTL ? {flexDirection: 'row-reverse'} : {}
      ]}
    >
      <Text style={[styles.textLabel, labelStyleText]}>
        {localLabels(language).expiry}
      </Text>
      <Text style={[styles.textContent, contentStyleText]}>
        {expiryRendered}
      </Text>
      <Text style={[styles.textLabel, labelStyleText1]}>
        {localLabels(language).CVV}
      </Text>
      <Text style={[styles.textContent, contentStyleText1]}>
        {clearCVV2Rendered}
      </Text>

      {!isError && shouldHide && (
        <TouchableOpacity
          onPress={() => setCardDetailsVisible(!cardDetailsVisible)}
        >
          <PredeterminedIcon
            name={cardDetailsVisible ? 'eye' : 'eye-off'}
            size={13}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
