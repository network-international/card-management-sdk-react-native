import * as React from 'react';
import { Pressable, Text, type TextStyle, type ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

interface NIButtonInterface {
  title: string;
  textColor?: string;
  colors?: string[];
  mode:
    | 'text'
    | 'outlined'
    | 'contained'
    | 'elevated'
    | 'contained-tonal'
    | undefined;
  opacity?: number;
  disabled?: boolean;
  onPress?: () => void;
}

function NIButton({
  title,
  mode,
  textColor,
  colors,
  disabled,
  opacity,
  onPress,
}: NIButtonInterface): JSX.Element {
  const defaultLinearGradientColors = ['#f0f0f0', '#e0e0e0', '#b0b0b0'];
  const buttonStyle: TextStyle = {
    opacity: opacity,
  };
  const resolvedMode = mode ?? 'text';

  const contentStyle: ViewStyle = {
    borderRadius: 20,
    borderWidth: resolvedMode === 'outlined' ? 1 : 0,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    backgroundColor:
      resolvedMode === 'contained' || resolvedMode === 'contained-tonal'
        ? 'rgba(0, 0, 0, 0.12)'
        : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  };

  const titleStyle: TextStyle = {
    color: disabled ? 'rgba(0, 0, 0, 0.35)' : textColor || '#111111',
    fontSize: 14,
    fontWeight: '600',
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 0.65, 0.9]}
      style={[styles.button, buttonStyle]}
      colors={(!disabled && colors) || defaultLinearGradientColors}
    >
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          contentStyle,
          pressed && !disabled ? { opacity: 0.8 } : null,
        ]}
      >
        <Text style={titleStyle}>{title}</Text>
      </Pressable>
    </LinearGradient>
  );
}

export { NIButton };
