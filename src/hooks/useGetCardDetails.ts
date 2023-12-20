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
    callback: (error: NIErrorResponse | null, result: string | null) => void
  ): void => {
    setIsLoading(true);
    NICardManagementSDKModule.getCardDetails(
      formatInput(input),
      (err: NIErrorResponse | null, res: NIGetCardSuccessResponse | null) => {
        setIsLoading(false);
        if (err) {
          setError(err);
          callback && callback(err, null);
        } else if (res) {
          setResult(res);
          setError(null);
          callback && callback(null, 'Card details retrieved with success!');
        }
      }
    );
  };

  return { result, error, isLoading, onGetCardDetails };
};
