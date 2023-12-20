import { useState } from 'react';

import NICardManagementSDKModule from '../nativeComponents/NICardManagementSDKModule';
import type { NiInputInterface } from '../interfaces/NiInputInterfaces';
import formatInput from '../utils/formatInput';
import type { NIErrorResponse } from '../interfaces/NiCardManagementInterfaces';

export const useChangePin = () => {
  const [result, setResult] = useState<string | null>();
  const [error, setError] = useState<NIErrorResponse | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onChangePin = (
    oldPin: string,
    newPin: string,
    input: NiInputInterface,
    callback: (error: NIErrorResponse | null, result: string | null) => void
  ): void => {
    setIsLoading(true);
    NICardManagementSDKModule.changePin(
      oldPin,
      newPin,
      formatInput(input),
      (err: NIErrorResponse | null, res: string | null | undefined) => {
        setIsLoading(false);
        if (err) {
          setError(err);
          callback && callback(err, null);
        } else if (res) {
          setResult(res);
          setError(null);
          callback && callback(null, res);
        }
      }
    );
  };

  return { result, error, isLoading, onChangePin };
};
