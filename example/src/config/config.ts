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
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrUV9BVG96UWc5cjRvOWw3QzJKVFRKU0FOUlV2U2JiTDNUcTRTeUh6T29RIn0.eyJleHAiOjE3MDUzOTUyNjYsImlhdCI6MTcwNTM5MzQ2NiwianRpIjoiZWRhYTA0MzMtNDY2MS00ZTg0LWExZjktY2QxMjZkNmU0ZWI3IiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1ub25wcm9kLm5ldHdvcmsuc2EvYXV0aC9yZWFsbXMvTkktTm9uUHJvZCIsInN1YiI6ImVlYmNiZGZiLTc3MDEtNDljMS1iYWVjLTcwZjYyYjU4ZWFiZSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZhMGI1YTYzLTcyMjItNGU4Mi1hMDQ3LTQ3ZTJlZjY2NTdlZjMxIiwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJjbGllbnRJZCI6ImZhMGI1YTYzLTcyMjItNGU4Mi1hMDQ3LTQ3ZTJlZjY2NTdlZjMxIiwib3JnX2lkIjoiQ1JPQVQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtZmEwYjVhNjMtNzIyMi00ZTgyLWEwNDctNDdlMmVmNjY1N2VmMzEifQ.Rn5ZOB2Hl_UJEZ8iBqSY7eLTnpfJOa7Dd2wqk_uqotkAZ9SBW8bbyzaR9YlvBapAn39h63ibYZKnmKYnM2XX385UY2Qyyg4v4rgykSOc0AQ8rhhLPqMdrpkOMnBWliKUC9vRKyy6rH8KTSv27dDEJBWHKF1-nM4bBspH36pa1f2xtj2VD3N9nGeVdf81ppgDrxMqMxOxfJQ8xs5JHb1_19u2A4FBbpvjj0PRBVn_rMC6zWqqeaYXK5wdyfOJ7aOF2EDVSb_jRcRinT9sy1L2QJV_AoWjSo5uqG1D05hLXLsuVORCSxvychReYc4kxNsSUToa0iDoyj97EkWpXhCHnQ';

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
