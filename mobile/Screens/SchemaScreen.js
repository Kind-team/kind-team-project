import React from 'react'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'

const SchemaScreen = ({ route }) => {
    const { to, from } = route?.params
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView style={{ flex: 1 }}
                source={{ uri: `https://yandex.ru/metro/moscow/${from?.id}/${to?.id}?route_from_id=${from?.id}&route_to_id=${to?.id}` }}
            />
        </SafeAreaView>
    )
}

export default SchemaScreen