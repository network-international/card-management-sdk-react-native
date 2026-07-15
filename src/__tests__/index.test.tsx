import normalizeNativeError from '../utils/normalizeNativeError';

describe('normalizeNativeError', () => {
  it('maps string errors to the default bridge error shape', () => {
    expect(normalizeNativeError('native error')).toEqual({
      domain: 'com.nicardmanagement.bridge',
      code: 'UNKNOWN_ERROR',
      message: 'native error',
    });
  });

  it('keeps known error objects and supports numeric codes', () => {
    expect(
      normalizeNativeError({
        domain: 'com.NICardManagementSDK',
        code: 500,
        message: 'failed',
      })
    ).toEqual({
      domain: 'com.NICardManagementSDK',
      code: 500,
      message: 'failed',
    });
  });

  it('maps native errorCode/errorMessage fallback fields', () => {
    expect(
      normalizeNativeError({ errorCode: '401', errorMessage: 'unauthorized' })
    ).toEqual({
      domain: 'com.nicardmanagement.bridge',
      code: '401',
      message: 'unauthorized',
    });
  });
});
