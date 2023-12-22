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

        val connectionProperties = NIConnectionProperties(
            connectionPropertiesJsonObject.getString("rootUrl"),
            connectionPropertiesJsonObject.getString("token")
        )
        return NIInput(bankCode, cardIdentifierId, cardIdentifierType, connectionProperties)
    } catch (e: Exception) {
        e.printStackTrace()
        return null
    }
}
