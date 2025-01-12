import type { ImageURISource } from 'react-native';
import {
  type themeType,
  type languageType,
  type NIFontLabelPair,
  NILabels,
  NILanguageEnum,
  NIThemeEnum,
  type NiInputInterface,
  type NICardAttributes,
  type NIDisplayAttributes,
  type NICardDetailsTextPositioning,
  type NIConnectionProperties,
  type NIInputInterface,
} from '@networkinternational/ni-card-management-sdk';

const textPositioning: NICardDetailsTextPositioning = {
  leftAlignment: 0.05,
  cardNumberGroupTopAlignment: 0.4,
  dateCvvGroupTopAlignment: 0.6,
  cardHolderNameGroupTopAlignment: 0.8,
};

const backgroundImage: ImageURISource = require('../assets/images/grayCard.png');
// const backgroundImage: ImageURISource = require('../assets/images/card-front.png');
const cardAttributes: NICardAttributes = {
  shouldHide: true,
  backgroundImage: backgroundImage,
  textPositioning: textPositioning,
};

const fonts: NIFontLabelPair[] = [
  /// Card Details
  {
    font: { name: 'Helvetica', size: 14 },
    label: NILabels.cardNumberLabel,
  },
  {
    font: { name: 'Helvetica', size: 14 },
    label: NILabels.cardNumberValueLabel,
  },
  {
    font: { name: 'Helvetica', size: 14 },
    label: NILabels.expiryDateLabel,
  },
  {
    font: { name: 'Helvetica', size: 14 },
    label: NILabels.expiryDateValueLabel,
  },
  { font: { name: 'Helvetica', size: 14 }, label: NILabels.cvvLabel },
  { font: { name: 'Helvetica', size: 14 }, label: NILabels.cvvValueLabel },
  {
    font: { name: 'Helvetica', size: 14 },
    label: NILabels.cardholderNameLabel,
  },
  /// Set PIN
  {
    font: { name: 'Helvetica', size: 14 },
    label: NILabels.setPinDescriptionLabel,
  },
  /// Change PIN
  {
    font: { name: 'Helvetica', size: 14 },
    label: NILabels.changePinDescriptionLabel,
  },
  /// View PIN
  {
    font: { name: 'Helvetica', size: 18 },
    label: NILabels.viewPinDescriptionLabel,
  },
  {
    font: { name: 'Helvetica', size: 18 },
    label: NILabels.viewPinCountDownDescription,
  },
  { font: { name: 'Helvetica', size: 18 }, label: NILabels.pinDigitLabel },
];

const displayAttributes: NIDisplayAttributes = {
  theme: NIThemeEnum.light as themeType,
  language: NILanguageEnum.english as languageType,
  fonts: fonts,
  cardAttributes: cardAttributes,
};

const ROOT_URL = 'https://apitest.network.ae';
const TEST_TOKEN = 'bmda6azqssd2r53645gbwrk6';
const EXTRA_HEADERS = '{ "myheader" : "593440eb7fa580d99d1abe85"}';
const BANK_CODE = 'EAND';
const CARD_ID = '52913582188097343008';
const CARD_TYPE = 'EXID';


const connectionProperties: NIConnectionProperties = {
  rootUrl: ROOT_URL,
  token: TEST_TOKEN,
  extraNetworkHeaders: EXTRA_HEADERS
};

export const TEST_INPUT: NiInputInterface = {
  bankCode: BANK_CODE,
  cardIdentifierId: CARD_ID,
  cardIdentifierType: CARD_TYPE,
  connectionProperties: connectionProperties,
  // optional
  displayAttributes: displayAttributes,
  // optional
  timer: 5,
};

export const cardInput: NIInputInterface = {
  bankCode: BANK_CODE,
  cardIdentifierId: CARD_ID,
  cardIdentifierType: CARD_TYPE,
  connectionProperties: connectionProperties,
};

export const TEST_INPUT_VIEW_PIN: NiInputInterface = {
  bankCode: BANK_CODE,
  cardIdentifierId: CARD_ID,
  cardIdentifierType: CARD_TYPE,
  connectionProperties: connectionProperties,
  timer: 5,
  displayAttributes: displayAttributes,
};

export const cardInput_VIEW_PIN: NIInputInterface = {
  bankCode: BANK_CODE,
  cardIdentifierId: CARD_ID,
  cardIdentifierType: CARD_TYPE,
  connectionProperties: connectionProperties,
};
