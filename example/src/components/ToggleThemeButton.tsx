import { NIThemeEnum } from '@networkinternational/ni-card-management-sdk';
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function ToggleThemeButton({
  theme,
  onChange,
  color,
}: {
  theme: string;
  onChange: () => void;
  color: string;
}): JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Toggle theme"
      onPress={onChange}
    >
      <Text style={[styles.textButton, { color }]}>
        {theme === NIThemeEnum.light ? 'Light' : 'Dark'}
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
