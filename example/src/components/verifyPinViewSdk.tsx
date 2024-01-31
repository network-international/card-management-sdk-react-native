import * as React from 'react';

import {
  VerifyPinView,
  type NIErrorResponse,
  NIPinTypeEnum,
} from '@networkinternational/ni-card-management-sdk';

import { TEST_INPUT } from '../config/config';

interface VerifyPinViewSdkInterface {
  callback: () => void;
}
export function VerifyPinViewSdk({
  callback,
}: VerifyPinViewSdkInterface): JSX.Element {
  const type = NIPinTypeEnum.fourDigits;
  return (
    <VerifyPinView
      input={TEST_INPUT}
      type={type}
      callback={(
        error: NIErrorResponse | null,
        result: string | null = null
      ) => {
        console.log('VerifyPinView', { error, result });
        callback();
      }}
    />
  );
}
