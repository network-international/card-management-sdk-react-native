import React from 'react';
import {
  type TextStyle,
  View,
  TouchableOpacity,
  Text,
  I18nManager,
} from 'react-native';
import { useClipboard } from '@react-native-community/clipboard';

import {
  type NIFontLabelPair,
  NIThemeEnum,
} from '../../interfaces/NiInputInterfaces';
import { type NICardDetailsCardNumberGroup } from '../../interfaces/NiInterfaces';
import { styles } from './styles';
import { HEIGHT_CARD } from '../../config/configCard';
import { themeColors } from '../../config/themeColors';
import { PredeterminedIcon } from '../icons/PredeterminedIcon';

export function CardDetailsCardNumberGroup({
  clearPan,
  maskedPan,
  pinContentIndex,
  cardDetailsVisible,
  setIsVisibleCopiedButton,
  displayAttributes,
  setTimeOut,
}: NICardDetailsCardNumberGroup): JSX.Element {
  const [data, setString] = useClipboard();

  const clearPanRendered = clearPan.replace(/.{4}/g, '$& ');
  const maskedPanRendered = maskedPan
    .replace(/[a-zA-Z0-9]+(?=....)/g, function (s: string) {
      return '*'.repeat(s.length);
    })
    .replace(/.{4}/g, '$& ');

  const cardNumber = cardDetailsVisible ? maskedPanRendered : clearPanRendered;

  const cardNumberGroupTopAlignment = Math.round(
    (displayAttributes?.cardAttributes?.textPositioning
      ?.cardNumberGroupTopAlignment || 0.4) * HEIGHT_CARD
  );
  const containerCardNumberContentGroupTopAlignmentStyle: TextStyle = {
    position: 'absolute',
    top: cardNumberGroupTopAlignment,
  };

  const theme = displayAttributes?.theme || NIThemeEnum.light;

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

  async function handleOnPress(): Promise<void> {
    await setString(clearPan);
    setIsVisibleCopiedButton(true);
    setTimeOut();
  }
  !!data && console.log('clipboard', data);

  return (
    <>
      <View
        style={[
          styles.containerCardNumberContentGroupTopAlignment,
          containerCardNumberContentGroupTopAlignmentStyle,
        ]}
      >
        <View
          style={[
            styles.copyRow,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
          <Text style={[styles.textContent, contentStyleText]}>
            {cardNumber}
          </Text>
          {!cardDetailsVisible && (
            <TouchableOpacity onPress={handleOnPress}>
              <PredeterminedIcon name="content-copy" size={13} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}
