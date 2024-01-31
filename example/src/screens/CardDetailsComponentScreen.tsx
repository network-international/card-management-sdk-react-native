import React from 'react';
import { View } from 'react-native';

import {
  CardDetailsComponent,
  type NIErrorResponse,
} from '@networkinternational/ni-card-management-sdk';
import { InputContext } from './ContextView';

function CardDetailsComponentScreen(): JSX.Element {
  const { inputData: input } = React.useContext(InputContext);

  return (
    <View>
      <CardDetailsComponent
        input={input}
        callback={(
          error: NIErrorResponse | null,
          result: string | null = null
        ) => {
          console.log('CardDetailsComponentScreen - callback', {
            error,
            result,
          });
        }}
      />
    </View>
  );
}

export default CardDetailsComponentScreen;
