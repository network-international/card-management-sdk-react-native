import { useState } from 'react';

import NICardManagementSDKModule from '../nativeComponents/NICardManagementSDKModule';
import type { NiInputInterface } from '../interfaces/NiInputInterfaces';
import formatInput from '../utils/formatInput';
import type {
  NIErrorResponse,
  NIGetCardSuccessResponse,
} from '../interfaces/NiCardManagementInterfaces';

export const useGetCardDetails = () => {
  const [result, setResult] = useState<NIGetCardSuccessResponse>();
  const [error, setError] = useState<NIErrorResponse | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onGetCardDetails = (
    input: NiInputInterface,
    callback: (err: NIErrorResponse | null, result: NIGetCardSuccessResponse | null) => void
  ) => {
    setIsLoading(true);
    NICardManagementSDKModule.getCardDetails(
      formatInput(input),
      (err, res) => {
        setIsLoading(false);
        if (err) {
          setError(err);
          return callback(err, null);
        }

        if (res) {
          setResult(res);
          setError(null);
          return callback(null, res); // ✅ Return actual result
        }

        // fallback error response
        return callback(
          { domain: 'SDK', code: 'UNKNOWN_ERROR', message: 'Unknown SDK error' },
          null
        );
      }
    );
  };

  return { result, error, isLoading, onGetCardDetails };
}
