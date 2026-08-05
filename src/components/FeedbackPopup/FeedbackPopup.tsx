import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import type { themeType } from '../../interfaces/NiInputInterfaces';
import type { NIErrorResponse } from '../../interfaces/NiCardManagementInterfaces';
import { themeColors } from '../../config/themeColors';
import localLabels from '../../utils/localization';

interface FeedbackPopupProps {
  error?: NIErrorResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  successMessage: string;
  theme: themeType;
  language: string;
}

export function FeedbackPopup({
  error,
  isLoading,
  isSuccess,
  successMessage,
  theme,
  language,
}: FeedbackPopupProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  const labels = localLabels(language);
  const isError = !!error;

  useEffect(() => {
    if (isLoading) {
      setIsVisible(false);
    } else if (error || isSuccess) {
      setIsVisible(true);
    }
  }, [error, isLoading, isSuccess]);

  const colors = themeColors[theme];

  return (
    <Modal
      animationType="fade"
      onRequestClose={() => setIsVisible(false)}
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.backdrop}>
        <View
          accessibilityRole="alert"
          style={[styles.popup, { backgroundColor: colors.background }]}
        >
          <Text style={[styles.title, isError ? styles.error : styles.success]}>
            {isError ? labels.errorTitle : labels.successTitle}
          </Text>
          <Text style={[styles.message, { color: colors.color }]}>
            {error?.message || successMessage}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsVisible(false)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{labels.ok}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  popup: {
    borderRadius: 8,
    maxWidth: 420,
    padding: 24,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  error: {
    color: '#C62828',
  },
  success: {
    color: '#2E7D32',
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#202124',
    borderRadius: 6,
    minWidth: 96,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
