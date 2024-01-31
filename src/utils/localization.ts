import { NILanguageEnum } from '../interfaces/NiInputInterfaces';
import { localization } from '../config/localization';

function localLabels(language: string) {
  return language === NILanguageEnum.arabic
    ? localization.arabic
    : localization.english;
}

export default localLabels;
