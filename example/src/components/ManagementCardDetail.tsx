import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInputManagementCardDetail from './TextInputManagementCardDetail';
import ShowHide from './ShowHideButton';
import { InputContext } from '../screens/ContextView';
import ToggleLanguageButton from './ToggleLanguageButton';
import { NILanguageEnum, NIThemeEnum } from '@networkinternational/ni-card-management-sdk';
import ToggleThemeButton from './ToggleThemeButton';
import ToggleViewPinTestInput from './ToggleViewPinTestInput';
import { TEST_INPUT, TEST_INPUT_VIEW_PIN } from '../config/config';
import { TextInput } from 'react-native-paper';

export default function ManagementCardDetail({
  pinType: { pinType, setPinType },
}: {
  pinType: {
    pinType: string;
    setPinType: (pinType: string) => void;
  };
}): JSX.Element {
  const { inputData: input, setInputData: setInput } = useContext(InputContext);

  const onChangeHandler = (data: string, py: string) => {
    input && setInput({ ...input, [py]: data });
  };
  const onChangeHandler1 = (data: string, py: string) => {
    if (input) {
      const connectionProperties = {
        ...input.connectionProperties,
        [py]: data,
      };
      setInput({ ...input, connectionProperties });
    }
  };
  const onChangeHandler2 = (data: string, py: string) => {
    if (
      input &&
      input.displayAttributes &&
      input.displayAttributes.cardAttributes
    ) {
      const textPositioning = {
        ...input.displayAttributes.cardAttributes.textPositioning,
        [py]: data,
      };
      const cardAttributes = {
        ...input.displayAttributes.cardAttributes,
        textPositioning: textPositioning,
      };
      const displayAttributes = {
        ...input.displayAttributes,
        cardAttributes: cardAttributes,
      };
      setInput({ ...input, displayAttributes });
    }
  };

  const onChangeHandler3 = () => {
    if (input) {
      const cardAttributes = {
        ...input?.displayAttributes?.cardAttributes,
        shouldHide: !input?.displayAttributes?.cardAttributes?.shouldHide,
      };
      const displayAttributes = {
        ...input.displayAttributes,
        cardAttributes: cardAttributes,
      };
      setInput({ ...input, displayAttributes });
    }
  };

  const onChangeHandler4 = () => {
    if (input) {
      const displayAttributes = {
        ...input.displayAttributes,
        language:
          input?.displayAttributes?.language === NILanguageEnum.english
            ? NILanguageEnum.arabic
            : NILanguageEnum.english,
      };
      setInput({ ...input, displayAttributes });
    }
  };

  const onChangeHandler5 = () => {
    if (input) {
      const displayAttributes = {
        ...input.displayAttributes,
        theme:
          input?.displayAttributes?.theme === NIThemeEnum.light
            ? NIThemeEnum.dark
            : NIThemeEnum.light,
      };
      setInput({ ...input, displayAttributes });
    }
  };

  const onChangeHandler6 = () => {
    if (input) {
      if (input.bankCode === 'CROAT') {
        setInput(TEST_INPUT);
      } else if (input.bankCode === 'EAND') {
        setInput(TEST_INPUT_VIEW_PIN);
      }
    }
  };

  const onChangeHidePinCountdownTime = (time: string) => {
    if (input) {
      setInput({ ...input, timer: parseInt(time || '0', 10) });
    }
  };

  return (
    <View>
      <TextInputManagementCardDetail
        label="RootUrl"
        value={input?.connectionProperties.rootUrl || ''}
        onChange={(data: string) => onChangeHandler1(data, 'rootUrl')}
      />
      <View style={styles.row}>
        <TextInputManagementCardDetail
          label="bankCode"
          value={input?.bankCode || ''}
          textInput={styles.textInput}
          onChange={(data: string) => onChangeHandler(data, 'bankCode')}
        />
        <TextInputManagementCardDetail
          label="Card identifier type"
          value={input?.cardIdentifierType || ''}
          textInput={styles.textInput}
          onChange={(data: string) =>
            onChangeHandler(data, 'cardIdentifierType')
          }
        />
      </View>
      <View style={styles.row}>
        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <TextInputManagementCardDetail
              label="left"
              value={
                input?.displayAttributes?.cardAttributes?.textPositioning?.leftAlignment.toString() ||
                ''
              }
              textInput={styles.textInputPositioning}
              onChange={(data: string) =>
                onChangeHandler2(data, 'leftAlignment')
              }
            />
          )}

        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <TextInputManagementCardDetail
              label="cardNumber"
              value={
                input?.displayAttributes?.cardAttributes?.textPositioning?.cardNumberGroupTopAlignment.toString() ||
                ''
              }
              textInput={styles.textInputPositioning}
              onChange={(data: string) =>
                onChangeHandler2(data, 'cardNumberGroupTopAlignment')
              }
            />
          )}
        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <TextInputManagementCardDetail
              label="date&CVV"
              value={
                input?.displayAttributes?.cardAttributes?.textPositioning?.dateCvvGroupTopAlignment.toString() ||
                ''
              }
              textInput={styles.textInputPositioning}
              onChange={(data: string) =>
                onChangeHandler2(data, 'dateCvvGroupTopAlignment')
              }
            />
          )}

        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <TextInputManagementCardDetail
              label="holder name"
              value={
                input?.displayAttributes?.cardAttributes?.textPositioning?.cardHolderNameGroupTopAlignment.toString() ||
                ''
              }
              textInput={styles.textInputPositioning}
              onChange={(data: string) =>
                onChangeHandler2(data, 'cardHolderNameGroupTopAlignment')
              }
            />
          )}
      </View>
      <View style={styles.row}>
        <TextInputManagementCardDetail
          label="token"
          textInput={styles.cardIdentifierIdInput}
          value={input?.connectionProperties.token || ''}
          onChange={(data: string) => onChangeHandler1(data, 'token')}
        />
        <TextInput
          inputMode="decimal"
          keyboardType="numeric"
          style={styles.digitInput}
          label="hide pin"
          value={!input?.timer ? '' : input?.timer.toString()}
          onChangeText={(data: string) => {
            onChangeHidePinCountdownTime(data);
          }}
        />
      </View>
      <View style={styles.row}>
        <TextInputManagementCardDetail
          label="Card identifier Id"
          textInput={styles.cardIdentifierIdInput}
          value={input?.cardIdentifierId || ''}
          onChange={(data: string) => onChangeHandler(data, 'cardIdentifierId')}
        />
        <TextInput
          inputMode="decimal"
          keyboardType="numeric"
          style={styles.digitInput}
          label="nr digits"
          value={pinType}
          onChangeText={(data: string) => {
            ['', '0', '1', '4', '5', '6'].includes(data) && setPinType(data);
          }}
        />
      </View>
      <View style={styles.row}>
        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <ShowHide
              isShowHide={
                input?.displayAttributes?.cardAttributes?.shouldHide || false
              }
              onChange={onChangeHandler3}
            />
          )}
        {input &&
          input.displayAttributes &&
          input.displayAttributes.language && (
            <ToggleLanguageButton
              language={input.displayAttributes.language}
              onChange={onChangeHandler4}
            />
          )}
        {input && input.displayAttributes && input.displayAttributes.theme && (
          <ToggleThemeButton
            theme={input.displayAttributes.theme}
            onChange={onChangeHandler5}
          />
        )}
        {input && (
          <ToggleViewPinTestInput
            viewPinTestData={input.bankCode === 'CROAT'}
            onChange={onChangeHandler6}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  textInput: {
    width: '46%',
  },
  textInputPositioning: {
    width: '22%',
  },
  cardIdentifierIdInput: {
    width: '70%',
  },
  digitInput: {
    width: '22%',
  },
});
