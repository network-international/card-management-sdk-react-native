package com.niwrappercardmanagementrn

import ae.network.nicardmanagementsdk.api.models.input.NIConnectionProperties
import ae.network.nicardmanagementsdk.api.models.input.NIInput
import org.json.JSONObject

fun deserializePerson(jsonString: String): NIInput? {
    try {
        val jsonObject = JSONObject(jsonString)
        val bankCode = jsonObject.getString("bankCode")
        val cardIdentifierId = jsonObject.getString("cardIdentifierId")
        val cardIdentifierType = jsonObject.getString("cardIdentifierType")
        val connectionPropertiesJsonObject = jsonObject.getJSONObject("connectionProperties")

        val rootUrl = connectionPropertiesJsonObject.getString("rootUrl")
        val token = connectionPropertiesJsonObject.getString("token")
        val extraNetworkHeadersString = connectionPropertiesJsonObject.getString("extraHeaders")
        val headersJsonObject = JSONObject(extraNetworkHeadersString)
        val extraNetworkHeaders = mutableMapOf<String, String>()

        //extraNetworkHeaders["apiuat_za_network_global"] = "qWyQt3D44Upner1T"
        headersJsonObject.keys().forEach {
          extraNetworkHeaders[it] = headersJsonObject.getString(it)
        }
        val connectionProperties = NIConnectionProperties(
            rootUrl,
            token,
            extraNetworkHeaders
        )
        return NIInput(bankCode, cardIdentifierId, cardIdentifierType, connectionProperties)
    } catch (e: Exception) {
        e.printStackTrace()
        return null
    }
}
