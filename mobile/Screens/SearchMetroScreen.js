import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const SearchMetroScreen = ({ route }) => {
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [focus, setFocus] = useState(false)

    const { item, markers } = route?.params

    const routes = {
        'Лубянка': require('../assets/route/Lub.png'),
        'Чеховская': require('../assets/route/Cze.png'),
        'Александровский сад': require('../assets/route/Alex.png'),
        'Чеховская-Лубянка': require('../assets/route/Cze-Lub.png'),
        'Чеховская-Александровский сад': require('../assets/route/Cze-Alex.png'),
        'Лубянка-Александровский сад': require('../assets/route/Lub-Alex.png'),
        'Лубянка-Чеховская': require('../assets/route/Lub-Cze.png'),
        'Александровский сад-Чеховская': require('../assets/route/Alex-Cze.png'),
        'Александровский сад-Лубянка': require('../assets/route/Alex-Lub.png'),
    }

    const fromRoute = markers.find((obj) => obj.title == from)
    const toRoute = markers.find((obj) => obj.title == to)

    const routeimg = routes[`${fromRoute?.title}${toRoute ? `-${toRoute?.title}` : ''}`]

    useEffect(() => {
        if (item) setFrom(item.title)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <View style={styles.searchInput}>
                    <TextInput onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ flex: 1 }} value={from} onChangeText={text => setFrom(text)} placeholder='Введите название станции метро' />
                    <Ionicons name='search-sharp' style={{ marginHorizontal: 15 }} size={25} />
                </View>
                <View style={styles.searchInput}>
                    <TextInput onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={{ flex: 1 }} value={to} onChangeText={text => setTo(text)} placeholder='Введите название станции метро' />
                    <Ionicons name='search-sharp' style={{ marginHorizontal: 15 }} size={25} />
                </View>
                {fromRoute && !focus ?
                    <View style={{ flex: 1, width: "100%", alignItems: 'center', marginTop: 24 }}>
                        <Image style={{ width: "100%", resizeMode: 'stretch' }} source={routeimg} />
                    </View> :
                    <Text>List Search</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 19,
        fontWeight: '600',
        marginBottom: 15,
        marginHorizontal: 20
    },
    searchInput: {
        height: 55,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    }
})

export default SearchMetroScreen