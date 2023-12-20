import React, { useState } from 'react';
import { View, useWindowDimensions, I18nManager } from 'react-native';

import {
  NILabels,
  NILanguageEnum,
  NIThemeEnum,
} from '../../interfaces/NiInputInterfaces';
import { type NICardDetailsGroups } from '../../interfaces/NiInterfaces';
import { CardDetailsCardNumberGroup } from './CardNumberGroup';
import { CardDetailsDateCVVGroupOneRow } from './DateCVVGroupOneRow';
import { CardDetailsCardHolderNameGroups } from './CardHolderNameGroups';
import { styles } from './styles';
import { WIDTH_CARD } from '../../config/configCard';
import { NIButton } from '../NIButton/NIButton';
import { themeColors } from '../../config/themeColors';
import localLabels from '../../utils/localization';

export function CardDetailsGroups({
  displayAttributes,
  getCardDetailsResult,
  isError,
}: NICardDetailsGroups): JSX.Element {
  const language =
    (displayAttributes?.language as string) || NILanguageEnum.english;
  const theme = displayAttributes?.theme || NIThemeEnum.light;

  const shouldHide = displayAttributes?.cardAttributes?.shouldHide || false;
  const [cardDetailsVisible, setCardDetailsVisible] = useState(shouldHide);
  const [isVisibleCopiedButton, setIsVisibleCopiedButton] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const { width } = useWindowDimensions();
  const leftAlignment =
    displayAttributes?.cardAttributes?.textPositioning?.leftAlignment || 0.09;
  const groupsLeftAlignment = Math.round(
    (leftAlignment * width * WIDTH_CARD) / 100
  );
  const containerGroupsLeftAlignmentStyle = {
    marginLeft: groupsLeftAlignment,
  };

  const textColor =
    theme === NIThemeEnum.light
      ? themeColors.light.buttonCopiedTextColor
      : themeColors.dark.buttonCopiedTextColor;

  const setTimeOut = () => {
    clearTimeout(timeoutId);

    setTimeoutId(
      setTimeout(() => {
        setIsVisibleCopiedButton(false);
        setTimeoutId(undefined);
      }, 4000)
    );
  };

  return (
    <>
      {getCardDetailsResult && (
        <View
          style={[
            styles.containerGroupsLeftAlignment,
            containerGroupsLeftAlignmentStyle,
            I18nManager.isRTL ? { flexDirection: 'row-reverse' } : {},
          ]}
        >
          <CardDetailsCardNumberGroup
            clearPan={getCardDetailsResult.clearPan}
            maskedPan={getCardDetailsResult.maskedPan}
            pinContentIndex={NILabels.cardNumberValueLabel}
            cardDetailsVisible={cardDetailsVisible}
            setIsVisibleCopiedButton={setIsVisibleCopiedButton}
            displayAttributes={displayAttributes}
            setTimeOut={setTimeOut}
          />
          <CardDetailsDateCVVGroupOneRow
            expiry={getCardDetailsResult.expiry}
            clearCVV2={getCardDetailsResult.clearCVV2}
            pinLabelIndex={NILabels.expiryDateLabel}
            pinContentIndex={NILabels.expiryDateValueLabel}
            pinLabel1Index={NILabels.cvvLabel}
            pinContent1Index={NILabels.cvvValueLabel}
            cardDetailsVisible={{ cardDetailsVisible, setCardDetailsVisible }}
            shouldHide={shouldHide}
            displayAttributes={displayAttributes}
            isError={isError}
          />
          <CardDetailsCardHolderNameGroups
            cardholderName={getCardDetailsResult.cardholderName}
            pinContentIndex={NILabels.cardholderNameLabel}
            cardDetailsVisible={cardDetailsVisible}
            setIsVisibleCopiedButton={setIsVisibleCopiedButton}
            setTimeOut={setTimeOut}
            displayAttributes={displayAttributes}
          />
          {isVisibleCopiedButton && (
            <View
              style={[
                styles.copyButton,
                I18nManager.isRTL ? { marginRight: '15%' } : {},
              ]}
            >
              <NIButton
                title={localLabels(language).copiedToClipboard}
                mode="text"
                textColor={textColor}
                colors={['#bbb', '#bbb', '#bbb']}
                disabled={false}
                opacity={0.8}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
}
