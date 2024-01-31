#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(NiCardManagement, NSObject)

RCT_EXTERN_METHOD(getCardDetails:(NSDictionary *)input
                  callback: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(setPin:(NSString *)pin
                  input:(NSDictionary *)input
                  callback: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(changePin:(NSString *)oldPin
                  newPin:(NSString *)newPin
                  input:(NSDictionary *)input
                  callback: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(verifyPin:(NSString *)pin
                  input:(NSDictionary *)input
                  callback: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(getPin:(NSDictionary *)input
                  callback: (RCTResponseSenderBlock)callback)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
