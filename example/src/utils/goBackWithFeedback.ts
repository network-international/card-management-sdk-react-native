import { Alert, InteractionManager } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NIErrorResponse } from '@networkinternational/ni-card-management-sdk';

import type { RootStackParamList } from '../navigation/RootNavigator';

export function goBackWithFeedback(
  navigation: NativeStackNavigationProp<RootStackParamList>,
  error: NIErrorResponse | null,
  result: string | null
): void {
  InteractionManager.runAfterInteractions(() => {
    requestAnimationFrame(() => {
      Alert.alert(
        error ? 'Error' : 'Success',
        error?.message || result || 'Operation completed.'
      );
    });
  });

  navigation.goBack();
}
