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

const ROOT_URL = 'https://apiuat.za.network.global/sdk/v2';
const TEST_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhVS1uNnVldXVNNWpfSU5XU1htcVc0NVBLY1psaDE3d2Q0WDRuRVFNVktFIn0.eyJleHAiOjE3MzY3MTUyMDYsImlhdCI6MTczNjcxMzQwNiwianRpIjoiODg3NTkyNDQtNzk5Yy00NzFmLWIzMWItYjU5MDhmMTZkZjczIiwiaXNzIjoiaHR0cHM6Ly8xMC4yMTMuMzUuNzQvYXV0aC9yZWFsbXMvTkktTm9uUHJvZCIsInN1YiI6ImNiYmNiZmQ2LTVhZTgtNDRmMS04NzFhLWJiZThjNzczYTBlZCIsInR5cCI6IkJlYXJlciIsImF6cCI6IjJlYjA2NTIxLTE1MmEtNDUxNi1iODJkLTgyMWFmNjEzYjQ4MzgiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImNsaWVudElkIjoiMmViMDY1MjEtMTUyYS00NTE2LWI4MmQtODIxYWY2MTNiNDgzOCIsIm9yZ19pZCI6Ik1UTkciLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtMmViMDY1MjEtMTUyYS00NTE2LWI4MmQtODIxYWY2MTNiNDgzOCJ9.Io58Rzso2cgqtYNMvk5YGYYi6F8rA-pnpoyjLr3nzAfeKXBueKBi_Yiye0NTth8kPOtss7M0oO10zzuVmDNXIOgZEFgHijL9xHV1YI7S7n8mE41LGRXbzXBASB8enQUwQ5OMpNI24KUtpdvXNs0I4iNsZ7Ay92o-wDv-oek_D7UG4RjA4SrwywUgBOHwADXYuNik0cbISbvs3XDr-rFDdpll8p4X84nE6X4qBjNe_fksLm62ohBG4On6xfGVcW6eiyPILyCr3VtntFxE0UBzjTGPvZZggoo5rDwH8NbHB0QLjDfLHFCDRJ0u-JzcZqTNLQhHuAS00l_bUenVv2vIHA';
const BANK_CODE = 'MTNG';
const CARD_ID = '54493796178884908975';
const CARD_TYPE = 'EXID';


const connectionProperties: NIConnectionProperties = {
  rootUrl: ROOT_URL,
  token: TEST_TOKEN,
  extraHeaders: "{ \"apiuat_za_network_global\": \"qWyQt3D44Upner1T\" }"
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
