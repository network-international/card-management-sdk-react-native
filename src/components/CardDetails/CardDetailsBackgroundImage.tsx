import React from 'react';
import { ImageBackground, type ImageURISource } from 'react-native';

import { type NICardDetailsImage } from '../../interfaces/NiInterfaces';
import { CardDetailsGroups } from './CardDetailsGroups';
import { styles } from './styles';

export function CardDetailsBackgroundImage({
  displayAttributes,
  getCardDetailsResult,
  isError,
}: NICardDetailsImage): JSX.Element {
  const backgroundImageDefault =
    require('../../assets/images/grayCard.png') as ImageURISource;

  const backgroundImage =
    displayAttributes?.cardAttributes?.backgroundImage ||
    backgroundImageDefault;

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.containerCardDetails}
      imageStyle={styles.backgroundImageStyle}
    >
      <CardDetailsGroups
        displayAttributes={displayAttributes}
        getCardDetailsResult={getCardDetailsResult}
        isError={isError}
      />
    </ImageBackground>
  );
}
