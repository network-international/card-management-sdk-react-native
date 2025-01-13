import Foundation
import NICardManagementSDK
import React

func createNICardManagementAPIInstance(from input: NSDictionary) -> NICardManagementAPI {
  let bankCode = input["bankCode"] as? String ?? ""
  let cardIdentifierId = input["cardIdentifierId"] as? String ?? ""
  let cardIdentifierType = input["cardIdentifierType"] as? String ?? ""
  let connectionProperties = input["connectionProperties"] as? NSDictionary

  let rootUrl = connectionProperties?["rootUrl"] as? String ?? ""
  let token = connectionProperties?["token"] as? String ?? ""

  let extraHeadersDict = connectionProperties?["extraNetworkHeaders"] as? NSDictionary
  var extraHeaders = [String: String]()
  if let extraHeadersDict = extraHeadersDict {
        for item in extraHeadersDict {
            guard let key = item.key as? String, let val = item.value as? String else { continue }
            extraHeaders[key] = val
        }
  }
        

  let tokenFetchable = TokenFetcherFactory.makeSimpleWrapper(tokenValue: token)
    
  let sdk = NICardManagementAPI(
      rootUrl: rootUrl,
      cardIdentifierId: cardIdentifierId,
      cardIdentifierType: cardIdentifierType,
      bankCode: bankCode,
      tokenFetchable: tokenFetchable,
      extraHeaders: extraHeaders
  )
  return sdk
}

@objc(NiCardManagement)
class NiCardManagement: NSObject {

    typealias Callback = (Result<String, Error>) -> Void

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc
  func getCardDetails(_ input: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
      let sdk = createNICardManagementAPIInstance(from: input)

      sdk.getCardDetails() { successResponse, errorResponse, completion in
          if let error = errorResponse {
            let errorCode = Int(error.errorCode) ?? 500
            let customeError: [String: Any?] = [
                            "domain": "com.NICardManagementSDK",
                            "code": errorCode,
                            "message": error.errorMessage
                        ]
            callback([customeError, NSNull()])
          } else if let success = successResponse {
           let cardDetailsObject: [String: Any?] = [
                           "clearPan": success.clearPan,
                           "maskedPan": success.maskedPan,
                           "expiry": success.expiry,
                           "clearCVV2": success.clearCVV2,
                           "cardholderName": success.cardholderName
                       ]
            callback([NSNull(), cardDetailsObject])
          }
      }
  }
  
  @objc
  func setPin(_ pin: String, input: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
      let sdk = createNICardManagementAPIInstance(from: input)
      
      sdk.setPin(pin: pin) { successResponse, errorResponse, completion in
        print("I am in setPin")
          if let error = errorResponse {
            let errorCode = Int(error.errorCode) ?? 500
            let customeError: [String: Any?] = [
                            "domain": "com.NICardManagementSDK",
                            "code": errorCode,
                            "message": error.errorMessage
                        ]
            callback([customeError, NSNull()])
          } else if let success = successResponse {
            callback([NSNull(), success.message])
          }
      }
  }

  
  @objc
  func changePin(_ oldPin: String, newPin: String, input: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
      let sdk = createNICardManagementAPIInstance(from: input)

      sdk.changePin(oldPin: oldPin, newPin: newPin) { successResponse, errorResponse, completion in
        print("I am in changePin")
        if let error = errorResponse {
          let errorCode = Int(error.errorCode) ?? 500
          let customeError: [String: Any?] = [
                          "domain": "com.NICardManagementSDK",
                          "code": errorCode,
                          "message": error.errorMessage
                      ]
          callback([customeError, NSNull()])
        } else if let success = successResponse {
          callback([NSNull(), success.message])
        }
      }
  }

  @objc
  func verifyPin(_ pin: String, input: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
      let sdk = createNICardManagementAPIInstance(from: input)
      
      sdk.verifyPin(pin: pin) { successResponse, errorResponse, completion in
        print("I am in verifyPin")
        if let error = errorResponse {
          let errorCode = Int(error.errorCode) ?? 500
          let customeError: [String: Any?] = [
                          "domain": "com.NICardManagementSDK",
                          "code": errorCode,
                          "message": error.errorMessage
                      ]
          callback([customeError, NSNull()])
        } else if let success = successResponse {
          callback([NSNull(), success.message])
        }
      }
  }

  @objc
  func getPin(_ input: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
      let sdk = createNICardManagementAPIInstance(from: input)

      sdk.getPin() { successResponse, errorResponse, completion in
        print("I am in getPin")
        if let error = errorResponse {
          let errorCode = Int(error.errorCode) ?? 500
          let customError: [String: Any?] = [
                          "domain": "com.NICardManagementSDK",
                          "code": errorCode,
                          "message": error.errorMessage
                      ]
          callback([customError, NSNull()])
        } else if let success = successResponse {
          callback([NSNull(), success])
        }
      }
  }
}
