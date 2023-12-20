package com.nicardmanagement

import com.facebook.react.bridge.Promise

import ae.network.nicardmanagementsdk.api.implementation.NICardManagement
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments
import com.niwrappercardmanagementrn.deserializePerson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


class NiCardManagementModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

      @ReactMethod
    fun getCardDetails(inputJsonString: String, cb: Callback) {
        val scope = CoroutineScope(Dispatchers.Main)

        scope.launch {
            try {
                val input = deserializePerson(inputJsonString)
                if (input != null) {
                    val detailsResponse = NICardManagement.getCardDetails(input)

                    if (detailsResponse.isError != null) {
                        val errorMessage = detailsResponse.isError!!.errorMessage ?: "An error occurred"
                        cb.invoke(errorMessage, null)
                    } else {
                        val response = Arguments.createMap()
                        response.putString("clearPan", detailsResponse.details!!.clearPan)
                        response.putString("maskedPan", detailsResponse.details!!.maskedPan)
                        response.putString("expiry", detailsResponse.details!!.expiry)
                        response.putString("clearCVV2", detailsResponse.details!!.clearCVV2)
                        response.putString("cardholderName", detailsResponse.details!!.clearCardholderName)
                        cb.invoke(null, response)
                    }
                } else {
                    cb.invoke("Error parsing input JSON", null)
                }
            } catch (e: Exception) {
                cb.invoke(e.message, null)
            }
        }
    }


    @ReactMethod
    fun setPin(pin: String, inputJsonString: String, cb: Callback) {
        val scope = CoroutineScope(Dispatchers.Main)

        scope.launch {
            try {
                val input = deserializePerson(inputJsonString)
                if (input != null) {
                    val detailsResponse = NICardManagement.setPin(pin, input)

                    if (detailsResponse.isError != null) {
                        val errorMessage = detailsResponse.isError!!.errorMessage ?: "An error occurred"
                        cb.invoke(errorMessage, null)
                    } else {
                        val response = detailsResponse.isSuccess!!.message
                        cb.invoke(null, response)
                    }
                } else {
                    cb.invoke("Error parsing input JSON", null)
                }
            } catch (e: Exception) {
                cb.invoke(e.message, null)
            }
        }
    }

    @ReactMethod
    fun verifyPin(pin: String, inputJsonString: String, cb: Callback) {
        val scope = CoroutineScope(Dispatchers.Main)

        scope.launch {
            try {
                val input = deserializePerson(inputJsonString)
                if (input != null) {
                    val detailsResponse = NICardManagement.verifyPin(pin, input)

                    if (detailsResponse.isError != null) {
                        val errorMessage = detailsResponse.isError!!.errorMessage ?: "An error occurred"
                        cb.invoke(errorMessage, null)
                    } else {
                        val response = detailsResponse.isSuccess!!.message
                        cb.invoke(null, response)
                    }
                } else {
                    cb.invoke("Error parsing input JSON", null)
                }
            } catch (e: Exception) {
                cb.invoke(e.message, null)
            }
        }
    }

    @ReactMethod
    fun changePin(oldPin: String, newPin: String, inputJsonString: String, cb: Callback) {
        val scope = CoroutineScope(Dispatchers.Main)

        scope.launch {
            try {
                val input = deserializePerson(inputJsonString)
                if (input != null) {
                    val detailsResponse = NICardManagement.changePin(oldPin, newPin, input)

                    if (detailsResponse.isError != null) {
                        val errorMessage = detailsResponse.isError!!.errorMessage ?: "An error occurred"
                        cb.invoke(errorMessage, null)
                    } else {
                        val response = detailsResponse.isSuccess!!.message
                        cb.invoke(null, response)
                    }
                } else {
                    cb.invoke("Error parsing input JSON", null)
                }
            } catch (e: Exception) {
                cb.invoke(e.message, null)
            }
        }
    }

    @ReactMethod
    fun getPin(inputJsonString: String, cb: Callback) {
        val scope = CoroutineScope(Dispatchers.Main)

        scope.launch {
            try {
                val input = deserializePerson(inputJsonString)
                if (input != null) {
                    val detailsResponse = NICardManagement.viewPin(input)

                    if (detailsResponse.error != null) {
                        val errorMessage = detailsResponse.error!!.errorMessage ?: "An error occurred"
                        cb.invoke(errorMessage, null)
                    } else {
                        val response = detailsResponse.pin!!.encrypted_pin
                        cb.invoke(null, response)
                    }
                } else {
                    cb.invoke("Error parsing input JSON", null)
                }
            } catch (e: Exception) {
                cb.invoke(e.message, null)
            }
        }
    }

  companion object {
    const val NAME = "NiCardManagement"
  }
}
