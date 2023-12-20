import React from 'react';

import { type NICardDetails } from '../../interfaces/NiInterfaces';
import { CardDetailsBackgroundImage } from './CardDetailsBackgroundImage';
import styles from './styles';
import { View } from 'react-native';

export function CardDetails({
  displayAttributes,
  getCardDetailsResult,
  isError,
}: NICardDetails): JSX.Element {
  return (
    <View style={styles.cardDetailsContainer}>
      <View style={styles.cardDetailsRow}>
        <CardDetailsBackgroundImage
          displayAttributes={displayAttributes}
          getCardDetailsResult={getCardDetailsResult}
          isError={isError}
        />
      </View>
    </View>
  );
}
