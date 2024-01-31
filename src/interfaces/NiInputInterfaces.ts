import type { ImageURISource } from 'react-native';

import type { NIInputInterface } from './NiCardManagementInterfaces';

export interface NICardDetailsTextPositioning {
  leftAlignment?: number;
  cardNumberGroupTopAlignment?: number;
  dateCvvGroupTopAlignment?: number;
  cardHolderNameGroupTopAlignment?: number;
}

export interface UIFont {
  name: string;
  size: number;
}
export interface NIFontLabelPair {
  font: UIFont;
  label: NILabels;
}

export enum NILabels {
  /// Card Details
  cardNumberLabel = 0,
  cardNumberValueLabel = 1,
  expiryDateLabel = 2,
  expiryDateValueLabel = 3,
  cvvLabel = 4,
  cvvValueLabel = 5,
  cardholderNameLabel = 6,

  /// Set PIN
  setPinDescriptionLabel = 7,

  /// Change PIN
  changePinDescriptionLabel = 8,

  /// View PIN
  viewPinDescriptionLabel = 9,
  viewPinCountDownDescription = 110,
  pinDigitLabel = 11,
}

export interface NICardAttributes {
  shouldHide: boolean;
  backgroundImage?: ImageURISource;
  textPositioning?: NICardDetailsTextPositioning;
}

export enum NIThemeEnum {
  light = 'light',
  dark = 'dark',
}

export enum NILanguageEnum {
  english = 'english',
  arabic = 'arabic',
}

export enum NIPinTypeEnum {
  fourDigits = 4,
  fiveDigits = 5,
  sixDigits = 6,
  dynamicFourToSix = 0,
}

export type themeType = 'dark' | 'light';
export type languageType = 'english' | 'arabic';
export interface NIDisplayAttributes {
  theme?: themeType;
  language?: languageType;
  fonts?: Array<NIFontLabelPair>;
  cardAttributes?: NICardAttributes;
}

export interface NiInputInterface extends NIInputInterface {
  timer?: number;
  displayAttributes?: NIDisplayAttributes;
}
