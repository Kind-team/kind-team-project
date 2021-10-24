import React, { useEffect, useRef } from 'react'
import { View, TextInput, StyleSheet, ImageBackground, Dimensions, ScrollView, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'

const { height, width } = Dimensions.get('window')
const SearchParkingScreen = ({ route }) => {
    const textInputRef = useRef(null)

    const { item } = route?.params

    useEffect(() => {
        textInputRef?.current?.focus()
        textInputRef?.current?.setNativeProps({
            text: item ? item.title : ''
        })
    }, [textInputRef])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.searchInput}>
                    <TextInput ref={textInputRef} style={{ flex: 1 }} placeholder='Введите название парковки' />
                    <Ionicons name='search-sharp' style={{ marginHorizontal: 15 }} size={25} />

                </View>
                <View style={{ height, width }}>
                    <ImageBackground style={{ flex: 1 }} resizeMode='stretch' source={require('../assets/parkingInfo.jpg')} />
                </View>
                <TouchableOpacity style={styles.allServices} >
                    <Text style={styles.buttonText}>В путь</Text>
                </TouchableOpacity>
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
        maxHeight: 55,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20
    },
    allServices: {
        marginHorizontal: 20,
        marginBottom: 15,
        marginTop: 10,
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
})

export default SearchParkingScreen