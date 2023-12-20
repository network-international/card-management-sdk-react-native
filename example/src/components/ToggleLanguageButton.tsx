import { NILanguageEnum } from 'ni-card-management-sdk';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ToggleLanguageButton({
  language,
  onChange,
}: {
  language: string;
  onChange: any;
}): JSX.Element {
  return (
    <>
      <TouchableOpacity onPress={onChange}>
        {language === NILanguageEnum.english ? (
          <Text style={styles.englishTextButton}>English</Text>
        ) : (
          <Text style={styles.arabicTextButton}>Arabic</Text>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  englishTextButton: {
    margin: 10,
    color: 'green',
    fontSize: 20,
  },
  arabicTextButton: {
    margin: 10,
    color: 'red',
    fontSize: 20,
  },
});
