import type { NIErrorResponse } from '../interfaces/NiCardManagementInterfaces';

const DEFAULT_DOMAIN = 'com.nicardmanagement.bridge';
const DEFAULT_CODE = 'UNKNOWN_ERROR';

const normalizeNativeError = (err: unknown): NIErrorResponse => {
  if (typeof err === 'string') {
    return {
      domain: DEFAULT_DOMAIN,
      code: DEFAULT_CODE,
      message: err,
    };
  }

  if (err && typeof err === 'object') {
    const candidate = err as Partial<NIErrorResponse> & {
      message?: unknown;
      domain?: unknown;
      code?: unknown;
      errorMessage?: unknown;
      errorCode?: unknown;
    };

    const message =
      typeof candidate.message === 'string'
        ? candidate.message
        : typeof candidate.errorMessage === 'string'
        ? candidate.errorMessage
        : 'An unknown native error occurred';

    return {
      domain:
        typeof candidate.domain === 'string'
          ? candidate.domain
          : DEFAULT_DOMAIN,
      code:
        typeof candidate.code === 'string' || typeof candidate.code === 'number'
          ? candidate.code
          : typeof candidate.errorCode === 'string' ||
            typeof candidate.errorCode === 'number'
          ? candidate.errorCode
          : DEFAULT_CODE,
      message,
    };
  }

  return {
    domain: DEFAULT_DOMAIN,
    code: DEFAULT_CODE,
    message: 'An unknown native error occurred',
  };
};

export default normalizeNativeError;
