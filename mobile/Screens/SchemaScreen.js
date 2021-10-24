import React, { useState } from 'react'
import { WebView } from 'react-native-webview'

const SchemaScreen = ({ route }) => {
    const { to, from } = route?.params
    return (
        <WebView
            style={{
                flex: 1,
                marginVertical:12
            }}
            source={{ uri: `https://yandex.ru/metro/moscow/${from?.id}/${to?.id}?route_from_id=${from?.id}&route_to_id=${to?.id}` }}
        />
    )
}

export default SchemaScreen