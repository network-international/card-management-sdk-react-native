import Foundation
import NICardManagementSDK
import React

private final class ExtraHeadersProvider: NICardManagementExtraHeaders {
  private let headers: [String: String]

  init(headers: [String: String]) {
    self.headers = headers
  }

  func additionalNetworkHeaders() -> [String: String] {
    return headers
  }
}

private func parseExtraHeaders(from connectionProperties: NSDictionary?) -> [String: String] {
  var extraHeaders = [String: String]()

  // Preferred contract: JSON string in connectionProperties.extraHeaders.
  if let extraHeadersJSON = connectionProperties?["extraHeaders"] as? String,
     !extraHeadersJSON.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty,
     let data = extraHeadersJSON.data(using: .utf8),
     let parsed = try? JSONSerialization.jsonObject(with: data) as? [String: Any] {
    for (key, value) in parsed {
      if let stringValue = value as? String {
        extraHeaders[key] = stringValue
      }
    }
  }

  // Backward compatibility: dictionary in connectionProperties.extraNetworkHeaders.
  if extraHeaders.isEmpty,
     let extraHeadersDict = connectionProperties?["extraNetworkHeaders"] as? NSDictionary {
    for item in extraHeadersDict {
      guard let key = item.key as? String else { continue }
      if let value = item.value as? String {
        extraHeaders[key] = value
      }
    }
  }

  return extraHeaders
}

private func makeBridgeError(errorCode: String?, errorMessage: String?) -> [String: Any] {
  let parsedErrorCode = Int(errorCode ?? "") ?? 500

  return [
    "domain": "com.NICardManagementSDK",
    "code": parsedErrorCode,
    "message": errorMessage ?? "Unknown error",
  ]
}

func createNICardManagementAPIInstance(from input: NSDictionary) -> NICardManagementAPI {
  let bankCode = input["bankCode"] as? String ?? ""
  let cardIdentifierId = input["cardIdentifierId"] as? String ?? ""
  let cardIdentifierType = input["cardIdentifierType"] as? String ?? ""
  let connectionProperties = input["connectionProperties"] as? NSDictionary

  let rootUrl = connectionProperties?["rootUrl"] as? String ?? ""
  let token = connectionProperties?["token"] as? String ?? ""
  let extraHeaders = parseExtraHeaders(from: connectionProperties)
    let extraHeadersProvider = extraHeaders.isEmpty ? nil : ExtraHeadersProvider(headers: extraHeaders)

  let tokenFetchable = TokenFetcherFactory.makeSimpleWrapper(tokenValue: token)

  let sdk = NICardManagementAPI(
      rootUrl: rootUrl,
      cardIdentifierId: cardIdentifierId,
      cardIdentifierType: cardIdentifierType,
      bankCode: bankCode,
      tokenFetchable: tokenFetchable,
      extraHeadersProvider: extraHeadersProvider
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
            callback([makeBridgeError(errorCode: error.errorCode, errorMessage: error.errorMessage), NSNull()])
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
          if let error = errorResponse {
            callback([makeBridgeError(errorCode: error.errorCode, errorMessage: error.errorMessage), NSNull()])
          } else if let success = successResponse {
            callback([NSNull(), success.message])
          }
      }
  }

  
  @objc
  func changePin(_ oldPin: String, newPin: String, input: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
      let sdk = createNICardManagementAPIInstance(from: input)

      sdk.changePin(oldPin: oldPin, newPin: newPin) { successResponse, errorResponse, completion in
        if let error = errorResponse {
          callback([makeBridgeError(errorCode: error.errorCode, errorMessage: error.errorMessage), NSNull()])
        } else if let success = successResponse {
          callback([NSNull(), success.message])
        }
      }
  }

  @objc
  func verifyPin(_ pin: String, input: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
      let sdk = createNICardManagementAPIInstance(from: input)
      
      sdk.verifyPin(pin: pin) { successResponse, errorResponse, completion in
        if let error = errorResponse {
          callback([makeBridgeError(errorCode: error.errorCode, errorMessage: error.errorMessage), NSNull()])
        } else if let success = successResponse {
          callback([NSNull(), success.message])
        }
      }
  }

  @objc
  func getPin(_ input: NSDictionary, callback: @escaping RCTResponseSenderBlock) {
      let sdk = createNICardManagementAPIInstance(from: input)

      sdk.getPin() { successResponse, errorResponse, completion in
        if let error = errorResponse {
          callback([makeBridgeError(errorCode: error.errorCode, errorMessage: error.errorMessage), NSNull()])
        } else if let success = successResponse {
          callback([NSNull(), success])
        }
      }
  }
}
