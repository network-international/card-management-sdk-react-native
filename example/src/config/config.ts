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
} from 'ni-card-management-sdk';

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
const TEST_TOKEN = 'fa939s8jbqz9bhsfysw5brqw';

const connectionProperties: NIConnectionProperties = {
  rootUrl: ROOT_URL,
  token: TEST_TOKEN,
};

export const TEST_INPUT: NiInputInterface = {
  bankCode: 'EAND',
  cardIdentifierId: '52913582188097343008',
  cardIdentifierType: 'EXID',
  connectionProperties: connectionProperties,
  displayAttributes: displayAttributes,
  timer: 5,
};

export const cardInput: NIInputInterface = {
  bankCode: 'EAND',
  cardIdentifierId: '52913582188097343008',
  cardIdentifierType: 'EXID',
  connectionProperties: connectionProperties,
};

const ROOT_URL_VIEW_PIN = 'https://api-uat.ksa.network.global/sdk/v2';
const TEST_TOKEN_VIEW_PIN =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrUV9BVG96UWc5cjRvOWw3QzJKVFRKU0FOUlV2U2JiTDNUcTRTeUh6T29RIn0.eyJleHAiOjE3MDMyNjEzNTksImlhdCI6MTcwMzI1OTU1OSwianRpIjoiYTZkNDZmYzMtZmFjOS00MTc2LWJiMDItOGI0YWY1OTc3YWNhIiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1ub25wcm9kLm5ldHdvcmsuc2EvYXV0aC9yZWFsbXMvTkktTm9uUHJvZCIsInN1YiI6ImVlYmNiZGZiLTc3MDEtNDljMS1iYWVjLTcwZjYyYjU4ZWFiZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZhMGI1YTYzLTcyMjItNGU4Mi1hMDQ3LTQ3ZTJlZjY2NTdlZjMxIiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6ImZhMGI1YTYzLTcyMjItNGU4Mi1hMDQ3LTQ3ZTJlZjY2NTdlZjMxIiwib3JnX2lkIjoiQ1JPQVQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtZmEwYjVhNjMtNzIyMi00ZTgyLWEwNDctNDdlMmVmNjY1N2VmMzEifQ.cu6oW9P5Vo5rUvDJCJY-_8yO0vcYHcOVdor_AJnmj9WodAR_O_ZuWtQa7daz9osnl45-BEpR8A3vJaO5NXbP27efmBep4pTal5dkuznXK0jpaWBT8_GMEi7LIXp_p03A41SF9S1gUfMgjgUc5RRVPTGkKAD9Ic_B6O142DE_vTlLgnWyGxQrRzpbL30hZXDiAhmFSjMlMDkAXcW4rLKdbzyeIEdf-3dkct74HjA5wR2o-eTnb5_tSXVkwiKX9U2a-mfuNdTnqTPCyHFPAj9SZiHxyzwb2bmRvuRLDlsA0u4O-7pWFw7v3LkGkeLdJJ4mU9XaTLYgl84QrYbcRDSWoQ';

const connectionProperties_VIEW_PIN: NIConnectionProperties = {
  rootUrl: ROOT_URL_VIEW_PIN,
  token: TEST_TOKEN_VIEW_PIN,
};
export const TEST_INPUT_VIEW_PIN: NiInputInterface = {
  bankCode: 'CROAT',
  cardIdentifierId: '40545400190652222937',
  cardIdentifierType: 'EXID',
  connectionProperties: connectionProperties_VIEW_PIN,
  timer: 5,
  displayAttributes: displayAttributes,
};

export const cardInput_VIEW_PIN: NIInputInterface = {
  bankCode: 'CROAT',
  cardIdentifierId: '40545400190652222937',
  cardIdentifierType: 'EXID',
  connectionProperties: connectionProperties_VIEW_PIN,
};
