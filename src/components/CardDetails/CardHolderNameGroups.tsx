import React from 'react';
import {
  type TextStyle,
  View,
  Text,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import { useClipboard } from '@react-native-community/clipboard';

import {
  type NIFontLabelPair,
  NIThemeEnum,
} from '../../interfaces/NiInputInterfaces';
import { type NICardDetailsCardHolderNameGroups } from '../../interfaces/NiInterfaces';
import { styles } from './styles';
import { HEIGHT_CARD } from '../../config/configCard';
import { themeColors } from '../../config/themeColors';
import { PredeterminedIcon } from '../icons/PredeterminedIcon';

export function CardDetailsCardHolderNameGroups({
  cardholderName,
  pinContentIndex,
  cardDetailsVisible,
  setIsVisibleCopiedButton,
  displayAttributes,
  setTimeOut,
}: NICardDetailsCardHolderNameGroups): JSX.Element {
  const [data, setString] = useClipboard();

  const maskedCardholderName = cardholderName.replace(
    /\b\w*/g,
    function (s: string) {
      return s.replace(/(?<!^)./g, '*');
    }
  );
  const cardholderNameRendered = cardDetailsVisible
    ? maskedCardholderName
    : cardholderName;

  const holderNameContentGroupTopAlignment = Math.round(
    (displayAttributes?.cardAttributes?.textPositioning
      ?.cardHolderNameGroupTopAlignment || 0.8) * HEIGHT_CARD
  );
  const containerHolderNameContentGroupTopAlignmentStyle: TextStyle = {
    position: 'absolute',
    top: holderNameContentGroupTopAlignment,
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
    await setString(cardholderName);
    setIsVisibleCopiedButton(true);
    setTimeOut();
  }
  !!data && console.log('clipboard', data);

  return (
    <>
      <View
        style={[
          styles.containerHolderNameContentGroupTopAlignment,
          containerHolderNameContentGroupTopAlignmentStyle,
        ]}
      >
        <View
          style={[
            styles.copyRow,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
          <Text style={[styles.textContent, contentStyleText]}>
            {cardholderNameRendered}
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
