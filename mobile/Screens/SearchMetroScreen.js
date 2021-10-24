import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import { Fontisto, Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SearchMetroScreen = ({ route, navigation }) => {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [focusFrom, setFocusFrom] = useState(false)
    const [focusTo, setFocusTo] = useState(false)

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

    const fromRoute = markers?.find((obj) => obj?.title == from)
    const toRoute = markers?.find((obj) => obj?.title == to)

    const routeimg = routes[`${fromRoute?.title}${toRoute ? `-${toRoute?.title}` : ''}`]

    useEffect(() => {
        if (item) setFrom(item?.title)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingHorizontal: 20 }}>
                <View style={styles.searchInput}>
                    <TextInput onFocus={() => setFocusFrom(true)} onBlur={() => setFocusFrom(false)} style={{ flex: 1 }} value={from} onChangeText={text => setFrom(text)} placeholder='Откуда ?' />
                    <Ionicons name='locate-sharp' style={{ marginHorizontal: 15 }} size={25} />
                </View>
                <View style={[styles.searchInput, { marginTop: 15 }]}>
                    <TextInput onFocus={() => setFocusTo(true)} onBlur={() => setFocusTo(false)} style={{ flex: 1 }} value={to} onChangeText={text => setTo(text)} placeholder='Куда ?' />
                    <Ionicons name='search-sharp' style={{ marginHorizontal: 15 }} size={25} />
                </View>
                {fromRoute && !focusFrom && !focusTo ?
                    <View style={{ flex: 1, width: "100%", marginTop: 24 }}>
                        <Image style={{ width: "100%", height:700, resizeMode: 'cover' }} source={routeimg} />
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Schema', { from: fromRoute, to: toRoute })}
                            style={styles.allServices}
                        >
                            <Text style={styles.buttonText}>Схема метро</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Map', { from: fromRoute, to: toRoute })}
                            style={[styles.allServices, { marginTop: 0 }]}
                        >
                            <Text style={styles.buttonText}>В путь</Text>
                        </TouchableOpacity>
                    </View> :
                    markers?.filter((object) => {
                        const current = object?.title.toLowerCase()
                        const next = focusFrom ? from?.toLowerCase() : to?.toLowerCase()
                        return current.includes(next)
                    }).map((obj) => (
                        <TouchableOpacity
                            key={obj.id}
                            style={styles.button}
                            onPress={() => {
                                if (focusTo) {
                                    setTo(obj?.title)
                                } else {
                                    setFrom(obj?.title)
                                }
                            }}
                        >
                            <Fontisto name='metro' style={{ marginHorizontal: 15 }} size={25} />
                            <Text style={styles.toObj}>{obj?.title}</Text>
                        </TouchableOpacity>
                    ))}
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
    },
    allServices: {
        marginTop: 16,
        marginBottom: 15,
        height: 55,
        backgroundColor: '#FF0000',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: 14
    },
    toObj: {
        fontSize: 20,
    },
    button: {
        flexDirection: "row",
        marginTop: 24,
        padding: 10
    }
})

export default SearchMetroScreen