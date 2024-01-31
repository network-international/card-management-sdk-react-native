import type {
  NiInputInterface,
  NIPinTypeEnum,
  NIDisplayAttributes,
  NILabels,
} from './NiInputInterfaces';
import type {
  NIErrorResponse,
  NIGetCardSuccessResponse,
} from './NiCardManagementInterfaces';

export enum NIStepEnum {
  currentPinStep = 0,
  setupPinStep = 1,
  reEnterPinStep = 2,
  verifyStep = 3,
}

export interface NICardDetailsComponent {
  input: NiInputInterface | null;
  callback: (error: NIErrorResponse | null, result: string | null) => void;
}

export interface NISetPinView {
  input: NiInputInterface | null;
  type?: NIPinTypeEnum;
  callback: (error: NIErrorResponse | null, result: string | null) => void;
}
export interface NIVerifyPinView {
  input: NiInputInterface | null;
  type?: NIPinTypeEnum;
  callback: (error: NIErrorResponse | null, result: string | null) => void;
}
export interface NIViewPinComponent {
  input: NiInputInterface | null;
  type?: NIPinTypeEnum;
  callback: (error: NIErrorResponse | null, result: string | null) => void;
}
export interface NIChangePinView {
  input: NiInputInterface | null;
  type: NIPinTypeEnum;
  callback: (error: NIErrorResponse | null, result: string | null) => void;
}
export interface NICardDetails {
  displayAttributes: NIDisplayAttributes | undefined;
  getCardDetailsResult: NIGetCardSuccessResponse | undefined;
  isError: boolean;
}
export interface NICardDetailsImage {
  displayAttributes: NIDisplayAttributes | undefined;
  getCardDetailsResult: NIGetCardSuccessResponse | undefined;
  isError: boolean;
}
export interface NICardDetailsGroups {
  displayAttributes: NIDisplayAttributes | undefined;
  getCardDetailsResult: NIGetCardSuccessResponse | undefined;
  isError: boolean;
}
export interface NICardDetailsCardNumberGroup {
  clearPan: string;
  maskedPan: string;
  pinContentIndex: NILabels;
  cardDetailsVisible: boolean;
  setIsVisibleCopiedButton: (isVisibleCopiedButton: boolean) => void;
  setTimeOut: () => void;
  displayAttributes: NIDisplayAttributes | undefined;
}
export interface NICardDetailsDateCVVGroupOneRow {
  expiry: string;
  clearCVV2: string;
  pinLabelIndex: NILabels;
  pinContentIndex: NILabels;
  pinLabel1Index: NILabels;
  pinContent1Index: NILabels;
  cardDetailsVisible: {
    cardDetailsVisible: boolean;
    setCardDetailsVisible: (visibleCardDetail: boolean) => void;
  };
  shouldHide: boolean;
  displayAttributes: NIDisplayAttributes | undefined;
  isError: boolean;
}
export interface NICardDetailsCardHolderNameGroups {
  cardholderName: string;
  pinContentIndex: NILabels;
  cardDetailsVisible: boolean;
  setIsVisibleCopiedButton: (isVisibleCopiedButton: boolean) => void;
  displayAttributes?: NIDisplayAttributes | undefined;
  setTimeOut: () => void;
}
export interface NIVerifyPin {
  pinType: NIPinTypeEnum;
  input: NiInputInterface | null;
  result: string | null | undefined;
  isLoading: boolean;
  onVerifyPin: NIOnVerifyPin;
  callback: (error: NIErrorResponse | null, result: string | null) => void;
}
export interface NISetupPin {
  pinType: NIPinTypeEnum;
  input: NiInputInterface | null;
  result: string | null | undefined;
  isLoading: boolean;
  onSetPin: NIOnSetPin;
  callback: (error: NIErrorResponse | null, result: string | null) => void;
}
export interface NIChangePin {
  pinType: NIPinTypeEnum;
  input: NiInputInterface | null;
  result: string | null | undefined;
  isLoading: boolean;
  onChangePin: NIOnChangePin;
  callback: (error: NIErrorResponse | null, result: string | null) => void;
}
export interface NIConfirmPin {
  language: string;
  theme: string;
  disabled: boolean;
  onConfirmPin: () => void;
}

interface NIOnVerifyPin {
  (
    pin: string,
    input: NiInputInterface,
    callback: (error: NIErrorResponse | null, result: string | null) => void
  ): void;
}
interface NIOnSetPin {
  (
    pin: string,
    input: NiInputInterface,
    callback: (error: NIErrorResponse | null, result: string | null) => void
  ): void;
}
interface NIOnChangePin {
  (
    currentPin: string,
    pin: string,
    input: NiInputInterface,
    callback: (error: NIErrorResponse | null, result: string | null) => void
  ): void;
}

export interface NICapturePin {
  setPin: {
    pin: string;
    setPin: (pin: string) => void;
    initialPin?: string;
    pinEditable: boolean;
  };
  setNextStep: {
    step: NIStepEnum;
    setNextStep?: (step: NIStepEnum) => void;
    onConfirmPin?: () => void;
  };
  pinType: NIPinTypeEnum;
  title: string;
  pinLabel: string;
  wrongPinLabel?: string;
  pinLabelIndex: NILabels;
  showHideLabels: {
    show: string;
    hide: string;
  };
  theme: string;
  input: NiInputInterface | null;
  showPin?: boolean | null;
}

export interface NINextButton {
  setNextStep: {
    step: NIStepEnum;
    setNextStep?: (step: NIStepEnum) => void;
  };
  disabled: boolean;
  theme: string;
}

export interface NIShowHideButton {
  setShowHide: {
    isShowHide: boolean;
    setIsShowHide: (isShowHide: boolean) => void;
  };
  showHideLabels: {
    show: string;
    hide: string;
  };
  theme: string;
}

export interface NICaptureVerifyPin {
  setPin: {
    pin: string;
    setPin: (pin: string) => void;
    pinEditable: boolean;
  };
  setNextStep: {
    step: NIStepEnum;
    setNextStep: (step: NIStepEnum) => void;
    onConfirmPin: () => void;
  };
  pinType: NIPinTypeEnum;
  language: string;
  theme: string;
  input: NiInputInterface | null;
}
export interface NIViewPin {
  pinType: NIPinTypeEnum;
  input: NiInputInterface | null;
  result: string;
  countdownTime: number;
}
export interface NISetUpNewCardPin {
  setPin: {
    pin: string;
    setPin: (pin: string) => void;
    pinEditable: boolean;
  };
  setNextStep: {
    step: NIStepEnum;
    setNextStep: (step: NIStepEnum) => void;
  };
  pinType: NIPinTypeEnum;
  language: string;
  theme: string;
  input: NiInputInterface | null;
}
export interface NICurrentCardPin {
  setPin: {
    currentPin: string;
    setCurrentPin: (currentPin: string) => void;
    pinEditable: boolean;
  };
  setNextStep: {
    step: NIStepEnum;
    setNextStep: (step: NIStepEnum) => void;
  };
  pinType: NIPinTypeEnum;
  language: string;
  theme: string;
  input: NiInputInterface | null;
}
export interface NIReenterCardPin {
  setPin: {
    confirmationPin: string;
    setConfirmationPin: (confirmationPin: string) => void;
    pin: string;
    pinEditable: boolean;
  };
  setNextStep: {
    step: NIStepEnum;
    onConfirmPin: () => void;
  };
  pinType: NIPinTypeEnum;
  language: string;
  theme: string;
  input: NiInputInterface | null;
}
