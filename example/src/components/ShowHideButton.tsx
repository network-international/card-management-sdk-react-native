import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function ShowHide({
  isShowHide,
  onChange,
  color,
}: {
  isShowHide: boolean;
  onChange: () => void;
  color: string;
}): JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={
        isShowHide ? 'Hide card details' : 'Show card details'
      }
      onPress={onChange}
    >
      <Text style={[styles.textButton, { color }]}>
        {isShowHide ? 'Hide card details' : 'Show card details'}
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
