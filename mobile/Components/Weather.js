import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Dimensions } from 'react-native'
import WeatherImage from '../assets/Sunny.png'

const { width } = Dimensions.get('window')

const Weather = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Погода</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.gismeteo.ru/weather-moscow-4368/')}>
                <Image style={styles.weather} resizeMode='cover' source={WeatherImage} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        fontSize: 19,
        fontWeight: '600',
        marginBottom: 15,
        marginHorizontal: 20
    },
    weather: {
        height: 200,
        width: width - 40,
        borderRadius: 20,
        overflow: 'hidden',
        alignSelf: 'center'
    }
})

export default Weather