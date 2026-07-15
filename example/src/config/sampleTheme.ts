import { NIThemeEnum } from '@networkinternational/ni-card-management-sdk';

export interface SampleThemeColors {
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;
  accent: string;
  danger: string;
  buttonText: string;
  buttonGradient: string[];
}

const lightColors: SampleThemeColors = {
  background: '#f5f7fa',
  surface: '#ffffff',
  text: '#172033',
  mutedText: '#5b6475',
  border: '#8c96a8',
  accent: '#006c82',
  danger: '#b3261e',
  buttonText: '#ffffff',
  buttonGradient: ['#147d96', '#0758b3', '#1829a4'],
};

const darkColors: SampleThemeColors = {
  background: '#10151c',
  surface: '#18212d',
  text: '#f2f5f9',
  mutedText: '#b8c0cc',
  border: '#687386',
  accent: '#5dd5ea',
  danger: '#ffb4ab',
  buttonText: '#ffffff',
  buttonGradient: ['#126b80', '#164f91', '#253b92'],
};

export const getSampleThemeColors = (
  theme: string | undefined
): SampleThemeColors => (theme === NIThemeEnum.dark ? darkColors : lightColors);
