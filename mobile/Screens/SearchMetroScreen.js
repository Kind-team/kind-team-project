import React, { useEffect, useRef } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const SearchMetroScreen = () => {
    const textInputRef = useRef(null)

    useEffect(() => {
        textInputRef?.current?.focus()
    }, [textInputRef])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchInput}>
                <TextInput ref={textInputRef} style={{ flex: 1 }} placeholder='Введите название станции метро' />
                <Ionicons name='search-sharp' style={{ marginHorizontal: 15 }} size={25} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
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