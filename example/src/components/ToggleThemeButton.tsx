import { NIThemeEnum } from 'ni-card-management-sdk';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ToggleThemeButton({
  theme,
  onChange,
}: {
  theme: string;
  onChange: any;
}): JSX.Element {
  return (
    <TouchableOpacity onPress={onChange}>
      {theme === NIThemeEnum.light ? (
        <Text style={styles.lightTextButton}>light</Text>
      ) : (
        <Text style={styles.darkTextButton}>dark</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  lightTextButton: {
    margin: 10,
    color: 'green',
    fontSize: 20,
  },
  darkTextButton: {
    margin: 10,
    color: 'red',
    fontSize: 20,
  },
});
