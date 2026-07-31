import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { type SampleThemeColors } from '../config/sampleTheme';

export default function TextInputManagementCardDetail({
  label,
  value,
  textInput,
  onChange,
  colors,
}: {
  label: string;
  value: string;
  textInput?: StyleProp<ViewStyle>;
  onChange: (value: string) => void;
  colors: SampleThemeColors;
}): JSX.Element {
  return (
    <View style={[styles.fieldContainer, textInput]}>
      <Text style={[styles.label, { color: colors.mutedText }]}>{label}</Text>
      <TextInput
        placeholder={label}
        placeholderTextColor={colors.mutedText}
        selectionColor={colors.accent}
        value={value}
        onChangeText={onChange}
        style={[
          styles.textInput,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    margin: 5,
    width: '95%',
  },
  label: {
    marginBottom: 4,
    marginLeft: 2,
    fontSize: 12,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
