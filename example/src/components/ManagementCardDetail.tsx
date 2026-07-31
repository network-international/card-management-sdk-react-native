import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import TextInputManagementCardDetail from './TextInputManagementCardDetail';
import ShowHide from './ShowHideButton';
import ToggleLanguageButton from './ToggleLanguageButton';
import ToggleThemeButton from './ToggleThemeButton';
import ToggleViewPinTestInput from './ToggleViewPinTestInput';
import { type SampleConfigController } from '../config/useSampleConfig';
import { type SampleThemeColors } from '../config/sampleTheme';

export default function ManagementCardDetail({
  config,
  colors,
}: {
  config: SampleConfigController;
  colors: SampleThemeColors;
}): JSX.Element {
  const { input, pinType } = config;

  return (
    <View>
      <TextInputManagementCardDetail
        label="RootUrl"
        value={input?.connectionProperties.rootUrl || ''}
        colors={colors}
        onChange={(data: string) =>
          config.onConnectionFieldChange('rootUrl', data)
        }
      />
      <View style={styles.row}>
        <TextInputManagementCardDetail
          label="bankCode"
          value={input?.bankCode || ''}
          colors={colors}
          textInput={styles.textInput}
          onChange={(data: string) =>
            config.onInputFieldChange('bankCode', data)
          }
        />
        <TextInputManagementCardDetail
          label="Card identifier type"
          value={input?.cardIdentifierType || ''}
          colors={colors}
          textInput={styles.textInput}
          onChange={(data: string) =>
            config.onInputFieldChange('cardIdentifierType', data)
          }
        />
      </View>
      <View style={styles.row}>
        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <TextInputManagementCardDetail
              label="left"
              colors={colors}
              value={
                input?.displayAttributes?.cardAttributes?.textPositioning?.leftAlignment?.toString() ||
                ''
              }
              textInput={styles.textInputPositioning}
              onChange={(data: string) =>
                config.onTextPositionChange('leftAlignment', data)
              }
            />
          )}

        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <TextInputManagementCardDetail
              label="cardNumber"
              colors={colors}
              value={
                input?.displayAttributes?.cardAttributes?.textPositioning?.cardNumberGroupTopAlignment?.toString() ||
                ''
              }
              textInput={styles.textInputPositioning}
              onChange={(data: string) =>
                config.onTextPositionChange('cardNumberGroupTopAlignment', data)
              }
            />
          )}
        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <TextInputManagementCardDetail
              label="date&CVV"
              colors={colors}
              value={
                input?.displayAttributes?.cardAttributes?.textPositioning?.dateCvvGroupTopAlignment?.toString() ||
                ''
              }
              textInput={styles.textInputPositioning}
              onChange={(data: string) =>
                config.onTextPositionChange('dateCvvGroupTopAlignment', data)
              }
            />
          )}

        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <TextInputManagementCardDetail
              label="holder name"
              colors={colors}
              value={
                input?.displayAttributes?.cardAttributes?.textPositioning?.cardHolderNameGroupTopAlignment?.toString() ||
                ''
              }
              textInput={styles.textInputPositioning}
              onChange={(data: string) =>
                config.onTextPositionChange(
                  'cardHolderNameGroupTopAlignment',
                  data
                )
              }
            />
          )}
      </View>
      <View style={styles.row}>
        <TextInputManagementCardDetail
          label="token"
          colors={colors}
          textInput={styles.cardIdentifierIdInput}
          value={input?.connectionProperties.token || ''}
          onChange={(data: string) =>
            config.onConnectionFieldChange('token', data)
          }
        />
        <View style={styles.digitInputContainer}>
          <Text style={[styles.label, { color: colors.mutedText }]}>
            hide pin
          </Text>
          <TextInput
            inputMode="decimal"
            keyboardType="numeric"
            selectionColor={colors.accent}
            style={[
              styles.digitInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            value={!input?.timer ? '' : input?.timer.toString()}
            onChangeText={(data: string) => {
              config.onTimerChange(data);
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        <TextInputManagementCardDetail
          label="Card identifier Id"
          colors={colors}
          textInput={styles.cardIdentifierIdInput}
          value={input?.cardIdentifierId || ''}
          onChange={(data: string) =>
            config.onInputFieldChange('cardIdentifierId', data)
          }
        />
        <View style={styles.digitInputContainer}>
          <Text style={[styles.label, { color: colors.mutedText }]}>
            nr digits
          </Text>
          <TextInput
            inputMode="decimal"
            keyboardType="numeric"
            selectionColor={colors.accent}
            style={[
              styles.digitInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
            value={pinType}
            onChangeText={(data: string) => {
              config.onPinTypeChange(data);
            }}
          />
        </View>
      </View>
      <View style={styles.row}>
        {input &&
          input.displayAttributes &&
          input.displayAttributes.cardAttributes && (
            <ShowHide
              isShowHide={
                input?.displayAttributes?.cardAttributes?.shouldHide || false
              }
              onChange={config.toggleShouldHide}
              color={colors.danger}
            />
          )}
        {input &&
          input.displayAttributes &&
          input.displayAttributes.language && (
            <ToggleLanguageButton
              language={input.displayAttributes.language}
              onChange={config.toggleLanguage}
              color={colors.accent}
            />
          )}
        {input && input.displayAttributes && input.displayAttributes.theme && (
          <ToggleThemeButton
            theme={input.displayAttributes.theme}
            onChange={config.toggleTheme}
            color={colors.accent}
          />
        )}
        {input && (
          <ToggleViewPinTestInput
            viewPinTestData={input.bankCode === 'CROAT'}
            onChange={config.toggleViewPinPreset}
            color={colors.accent}
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
  digitInputContainer: {
    width: '22%',
    margin: 5,
  },
  label: {
    marginBottom: 4,
    marginLeft: 2,
    fontSize: 12,
  },
  digitInput: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
