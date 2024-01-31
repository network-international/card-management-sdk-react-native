import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function TextInputManagementCardDetail({
  label,
  value,
  textInput,
  onChange,
}: {
  label: string;
  value: string;
  textInput?: object;
  onChange: any;
}): JSX.Element {
  return (
    <TextInput
      outlineColor="gray"
      label={label}
      placeholder={label}
      value={value}
      onChangeText={onChange}
      style={[styles.textInput, textInput]}
      theme={{ colors: { text: 'white', primary: 'rgb(33, 151, 186)' } }}
    />
  );
}

const styles = StyleSheet.create({
  textInput: {
    margin: 5,
    width: '95%',
    borderRadius: 5,
  },
});
