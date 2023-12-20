import * as React from 'react';

import {
  ChangePinView,
  NIPinTypeEnum,
  type NIErrorResponse,
} from '@networkinternational/ni-card-management-sdk';

import { TEST_INPUT } from '../config/config';

interface ChangePinViewSdkInterface {
  callback: () => void;
}
export function ChangePinViewSdk({
  callback,
}: ChangePinViewSdkInterface): JSX.Element {
  const type = NIPinTypeEnum.fourDigits;
  return (
    <ChangePinView
      input={TEST_INPUT}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        console.log('ChangePinView', { error, result });
        callback();
      }}
    />
  );
}
