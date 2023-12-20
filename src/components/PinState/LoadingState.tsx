import React from 'react';
import { ActivityIndicator, type TextStyle, View } from 'react-native';

import { themeColors } from '../../config/themeColors';
import { NIThemeEnum } from '../../interfaces/NiInputInterfaces';
import { HEIGHT_CARD } from '../../config/configCard';

export default function LoadingState({
  isLoading,
  theme,
  isCardDetails,
}: {
  isLoading: boolean;
  theme: string;
  isCardDetails?: boolean | undefined;
}): JSX.Element {
  const color =
    theme === NIThemeEnum.light
      ? themeColors.light.colorActivityIndicator
      : themeColors.dark.colorActivityIndicator;

  const LoadingIndicator: TextStyle = {
    top: isCardDetails ? -(HEIGHT_CARD + 24) / 2 : 250,
  };
  return (
    <View style={LoadingIndicator}>
      {isLoading && <ActivityIndicator size="small" color={color} />}
    </View>
  );
}
