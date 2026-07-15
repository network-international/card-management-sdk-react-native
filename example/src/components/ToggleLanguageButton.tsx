import { NILanguageEnum } from '@networkinternational/ni-card-management-sdk';
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function ToggleLanguageButton({
  language,
  onChange,
  color,
}: {
  language: string;
  onChange: () => void;
  color: string;
}): JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Toggle language"
      onPress={onChange}
    >
      <Text style={[styles.textButton, { color }]}>
        {language === NILanguageEnum.english ? 'English' : 'Arabic'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textButton: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
  },
});
