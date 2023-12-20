import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ToggleViewPinTestInput({
  viewPinTestData,
  onChange,
}: {
  viewPinTestData: boolean;
  onChange: any;
}): JSX.Element {
  return (
    <>
      <TouchableOpacity onPress={onChange}>
        {viewPinTestData ? (
          <Text style={styles.noViewPinTestDataButton}>
            No View Pin Test Data
          </Text>
        ) : (
          <Text style={styles.viewPinTestDataButton}>View Pin Test Data</Text>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  viewPinTestDataButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'green',
    fontSize: 20,
  },
  noViewPinTestDataButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'red',
    fontSize: 20,
  },
});
