import React, { useRef, useMemo, useCallback, useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const SearchParking = () => {
    return (
        <View style={styles.container}>
            <View style={styles.searchInput}>
                <TextInput style={{ flex: 1 }} placeholder='Найти парковку' />
                <Ionicons name='search-sharp' style={{ marginHorizontal: 15 }} size={25} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20
    },
    searchInput: {
        height: 55,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default SearchParking