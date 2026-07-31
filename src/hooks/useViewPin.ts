import { useCallback, useState } from 'react';

import NICardManagementSDKModule from '../nativeComponents/NICardManagementSDKModule';
import type { NiInputInterface } from '../interfaces/NiInputInterfaces';
import formatInput from '../utils/formatInput';
import normalizeNativeError from '../utils/normalizeNativeError';
import type { NIErrorResponse } from '../interfaces/NiCardManagementInterfaces';

export const useViewPin = () => {
  const [result, setResult] = useState<string | null>();
  const [error, setError] = useState<NIErrorResponse | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onViewPin = useCallback(
    (
      input: NiInputInterface,
      callback?: (error: NIErrorResponse | null, result: string | null) => void
    ) => {
      setIsLoading(true);
      NICardManagementSDKModule.getPin(
        formatInput(input),
        (err: unknown, res: string | null) => {
          setIsLoading(false);
          if (err) {
            const normalizedError = normalizeNativeError(err);
            setError(normalizedError);
            callback && callback(normalizedError, null);
          } else if (res) {
            setResult(res);
            setError(null);
            callback && callback(null, res);
          }
        }
      );
    },
    []
  );

  return { result, error, isLoading, onViewPin };
};
