import * as React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, type TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0, 0.65, 0.9]}
      style={[styles.button, buttonStyle]}
      colors={(!disabled && colors) || defaultLinearGradientColors}
    >
      <Button
        mode={mode}
        textColor={textColor}
        disabled={disabled}
        onPress={onPress}
      >
        {title}
      </Button>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 20,
  },
});

export default NIButton;
