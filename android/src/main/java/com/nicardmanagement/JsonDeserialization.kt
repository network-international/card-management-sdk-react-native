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

        val extraNetworkHeaders = mutableMapOf<String, String>()
        val extraNetworkHeadersJsonObject = connectionPropertiesJsonObject.getJSONObject("extraNetworkHeaders")
        if (extraNetworkHeadersJsonObject != null) {
            val jsonMap = extraNetworkHeadersJsonObject.toMap()
            val keysItr: Iterator<String> = jsonMap.keys()
            while (keysItr.hasNext()) {
                val key = keysItr.next()
                var value: Any = this.get(key)
                if (value is String) {
                    extraNetworkHeaders[key] = value as String
                }
            }
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
