import * as React from 'react';

import {
  SetPinView,
  type NIErrorResponse,
  NIPinTypeEnum,
} from '@networkinternational/ni-card-management-sdk';

import { TEST_INPUT } from '../config/config';

interface SetPinViewSdkInterface {
  callback: () => void;
}
export function SetPinViewSdk({
  callback,
}: SetPinViewSdkInterface): JSX.Element {
  const type = NIPinTypeEnum.fourDigits;

  return (
    <SetPinView
      input={TEST_INPUT}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        console.log('SetPinView', { error, result });
        callback();
      }}
    />
  );
}
