import { useCallback, useContext, useState } from 'react';
import {
  type NiInputInterface,
  NILanguageEnum,
  NIThemeEnum,
} from '@networkinternational/ni-card-management-sdk';

import { InputContext } from '../screens/ContextView';
import { TEST_INPUT, TEST_INPUT_VIEW_PIN } from './config';

type EditableInputField =
  | 'bankCode'
  | 'cardIdentifierId'
  | 'cardIdentifierType';
type EditableConnectionField = 'rootUrl' | 'token';
type EditableTextPositionField =
  | 'leftAlignment'
  | 'cardNumberGroupTopAlignment'
  | 'dateCvvGroupTopAlignment'
  | 'cardHolderNameGroupTopAlignment';

const ALLOWED_PIN_TYPES = ['', '0', '1', '4', '5', '6'];

export interface SampleConfigController {
  input: NiInputInterface | null;
  pinType: string;
  onInputFieldChange: (field: EditableInputField, value: string) => void;
  onConnectionFieldChange: (
    field: EditableConnectionField,
    value: string
  ) => void;
  onTextPositionChange: (
    field: EditableTextPositionField,
    value: string
  ) => void;
  onTimerChange: (value: string) => void;
  onPinTypeChange: (value: string) => void;
  toggleShouldHide: () => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  toggleViewPinPreset: () => void;
}

export const useSampleConfig = (): SampleConfigController => {
  const { inputData: input, setInputData } = useContext(InputContext);
  const [pinType, setPinType] = useState('4');

  const onInputFieldChange = useCallback(
    (field: EditableInputField, value: string) => {
      if (!input) {
        return;
      }

      setInputData({ ...input, [field]: value });
    },
    [input, setInputData]
  );

  const onConnectionFieldChange = useCallback(
    (field: EditableConnectionField, value: string) => {
      if (!input) {
        return;
      }

      setInputData({
        ...input,
        connectionProperties: {
          ...input.connectionProperties,
          [field]: value,
        },
      });
    },
    [input, setInputData]
  );

  const onTextPositionChange = useCallback(
    (field: EditableTextPositionField, value: string) => {
      if (!input?.displayAttributes?.cardAttributes) {
        return;
      }

      const numericValue = parseFloat(value);
      const nextValue = Number.isNaN(numericValue) ? 0 : numericValue;
      const currentTextPositioning =
        input.displayAttributes.cardAttributes.textPositioning ?? {};

      setInputData({
        ...input,
        displayAttributes: {
          ...input.displayAttributes,
          cardAttributes: {
            ...input.displayAttributes.cardAttributes,
            textPositioning: {
              ...currentTextPositioning,
              [field]: nextValue,
            },
          },
        },
      });
    },
    [input, setInputData]
  );

  const onTimerChange = useCallback(
    (value: string) => {
      if (!input) {
        return;
      }

      setInputData({
        ...input,
        timer: parseInt(value || '0', 10),
      });
    },
    [input, setInputData]
  );

  const onPinTypeChange = useCallback((value: string) => {
    if (ALLOWED_PIN_TYPES.includes(value)) {
      setPinType(value);
    }
  }, []);

  const toggleShouldHide = useCallback(() => {
    if (!input?.displayAttributes?.cardAttributes) {
      return;
    }

    setInputData({
      ...input,
      displayAttributes: {
        ...input.displayAttributes,
        cardAttributes: {
          ...input.displayAttributes.cardAttributes,
          shouldHide: !input.displayAttributes.cardAttributes.shouldHide,
        },
      },
    });
  }, [input, setInputData]);

  const toggleLanguage = useCallback(() => {
    if (!input?.displayAttributes) {
      return;
    }

    setInputData({
      ...input,
      displayAttributes: {
        ...input.displayAttributes,
        language:
          input.displayAttributes.language === NILanguageEnum.english
            ? NILanguageEnum.arabic
            : NILanguageEnum.english,
      },
    });
  }, [input, setInputData]);

  const toggleTheme = useCallback(() => {
    if (!input?.displayAttributes) {
      return;
    }

    setInputData({
      ...input,
      displayAttributes: {
        ...input.displayAttributes,
        theme:
          input.displayAttributes.theme === NIThemeEnum.light
            ? NIThemeEnum.dark
            : NIThemeEnum.light,
      },
    });
  }, [input, setInputData]);

  const toggleViewPinPreset = useCallback(() => {
    if (!input) {
      return;
    }

    setInputData(input.bankCode === 'CROAT' ? TEST_INPUT : TEST_INPUT_VIEW_PIN);
  }, [input, setInputData]);

  return {
    input,
    pinType,
    onInputFieldChange,
    onConnectionFieldChange,
    onTextPositionChange,
    onTimerChange,
    onPinTypeChange,
    toggleShouldHide,
    toggleLanguage,
    toggleTheme,
    toggleViewPinPreset,
  };
};
