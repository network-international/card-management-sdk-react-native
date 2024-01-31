import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ShowHide({
  isShowHide,
  onChange,
}: {
  isShowHide: boolean;
  onChange: any;
}): JSX.Element {
  return (
    <TouchableOpacity onPress={onChange}>
      {isShowHide ? (
        <Text style={styles.hideTextButton}>Hide card details</Text>
      ) : (
        <Text style={styles.showTextButton}>Show card details</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  showTextButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'green',
    fontSize: 20,
  },
  hideTextButton: {
    marginLeft: 10,
    marginRight: 10,
    color: 'red',
    fontSize: 20,
  },
});
