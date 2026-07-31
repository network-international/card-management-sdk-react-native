import { useCallback, useState } from 'react';

import NICardManagementSDKModule from '../nativeComponents/NICardManagementSDKModule';
import type { NiInputInterface } from '../interfaces/NiInputInterfaces';
import formatInput from '../utils/formatInput';
import normalizeNativeError from '../utils/normalizeNativeError';
import type { NIErrorResponse } from '../interfaces/NiCardManagementInterfaces';

export const useSetPin = () => {
  const [result, setResult] = useState<string | null>();
  const [error, setError] = useState<NIErrorResponse | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSetPin = useCallback(
    (
      pin: string,
      input: NiInputInterface,
      callback: (error: NIErrorResponse | null, result: string | null) => void
    ): void => {
      setIsLoading(true);
      NICardManagementSDKModule.setPin(
        pin,
        formatInput(input),
        (err: unknown, res: string | null | undefined) => {
          setIsLoading(false);
          if (err) {
            const normalizedError = normalizeNativeError(err);
            setError(normalizedError);
            callback && callback(normalizedError, null);
          } else if (res) {
            setError(null);
            setResult(res);
            callback && callback(null, res);
          }
        }
      );
    },
    []
  );

  return { result, error, isLoading, onSetPin };
};
