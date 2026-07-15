import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export default function ToggleViewPinTestInput({
  viewPinTestData,
  onChange,
  color,
}: {
  viewPinTestData: boolean;
  onChange: () => void;
  color: string;
}): JSX.Element {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Toggle view pin test data preset"
      onPress={onChange}
    >
      <Text style={[styles.textButton, { color }]}>
        {viewPinTestData ? 'No View Pin Test Data' : 'View Pin Test Data'}
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
