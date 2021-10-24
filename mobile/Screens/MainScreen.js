import React, { useRef, useMemo, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import { Fontisto, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import News from '../Components/News'
import Weather from '../Components/Weather'

import MetroImg from '../assets/metro.png'
import TransportImg from '../assets/transport.png'
import ParkingImg from '../assets/parking.png'


const services = [
    {
        id: 0,
        name: 'Станции метро'
    },
    {
        id: 1,
        name: 'Общественный транспорт'
    },
    {
        id: 2,
        name: 'Парковка'
    },
    {
        id: 3,
        name: 'Схема метро'
    }
]

const markers = [
    {
        id: 'st37392265',
        title: 'Лубянка',
        type: 0,
        coordinate: {
            latitude: 55.759806,
            longitude: 37.628000
        },
    },
    {
        id: 'st20386865',
        title: 'Чеховская',
        type: 0,
        coordinate: {
            latitude: 55.7647441,
            longitude: 37.6082388
        },
    },
    {
        id: 'st23821145',
        title: 'Александровский сад',
        type: 0,
        coordinate: {
            latitude: 55.752416,
            longitude: 37.608602
        },
    },
    {
        id: '256776',
        title: 'Лубянская площадь',
        type: 1,
        coordinate: {
            latitude: 55.7581596,
            longitude: 37.6224026
        },
    },
    {
        id: '2411422444',
        title: 'Пушкинская пл.',
        type: 1,
        coordinate: {
            latitude: 55.7657313,
            longitude: 37.6035385
        },
    },
    {
        id: '2225555',
        title: 'ст. м. Библиотека им. Ленина',
        type: 1,
        coordinate: {
            latitude: 55.7522376,
            longitude: 37.6082346
        },
    },
    {
        id: '125412512',
        title: 'Никольская плаза',
        type: 2,
        coordinate: {
            latitude: 55.7580223,
            longitude: 37.6248115
        },
    },
    {
        id: '242124444',
        title: 'Парковка на Пушкинской',
        type: 2,
        coordinate: {
            latitude: 55.7649719,
            longitude: 37.6044157
        },
    },
    {
        id: '24243444',
        title: 'MCD Паркинг',
        type: 2,
        coordinate: {
            latitude: 55.75197,
            longitude: 37.6085694
        },
    },
]

const serviceIcon = {
    0: <Fontisto name='train' size={29} />,
    1: <Fontisto name='bus' size={25} />,
    2: <FontAwesome5 name='parking' size={29} />,
    3: <MaterialCommunityIcons name='map-marker-path' size={28} />,
}

const servicePlaceholder = {
    0: 'Найти станцию метро',
    1: 'Найти общественный транспорт',
    2: 'Найти парковку'
}

const serviceNavigate = {
    0: 'SearchMetro',
    1: 'SearchTransport',
    2: 'SearchParking'
}

const { height } = Dimensions.get('screen')

const MainScreen = (props) => {
    const bottomSheetRef = useRef(null)
    const [selectService, setSelectService] = useState(0)
    const [myPosition, setMyPosition] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const snapPoints = useMemo(() => ['35%', '90%'], [])

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setMyPosition(location);
        })()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 55.751244,
                    longitude: 37.618423,
                    latitudeDelta: 0.0422,
                    longitudeDelta: 0.0221,
                }}
                style={styles.map}
            >
                {markers?.filter((object) => object.type === selectService).map((item) => {
                    if (item.type === 0) {
                        return (
                            <Marker
                                key={item.id}
                                onPress={() => props.navigation.navigate('SearchMetro', { item, markers })}
                                coordinate={item.coordinate}
                            >
                                <Image source={MetroImg} style={{ height: 50, width: 50 }} />
                            </Marker>
                        )
                    } else if (item.type === 1) {
                        return (
                            <Marker
                                key={item.id}
                                // onPress={() => props.navigation.navigate('SearchMetro', { item, markers })}
                                coordinate={item.coordinate}
                            >
                                <Image source={TransportImg} style={{ height: 30, width: 30 }} />
                            </Marker>
                        )
                    } else if (item.type === 2) {
                        return (
                            <Marker
                                key={item.id}
                                // onPress={() => props.navigation.navigate('SearchMetro', { item, markers })}
                                coordinate={item.coordinate}
                            >
                                <Image source={ParkingImg} style={{ height: 30, width: 30 }} />
                            </Marker>
                        )
                    }
                })}
                {myPosition ? <Marker coordinate={{ latitude: myPosition?.coords.latitude, longitude: myPosition?.coords.longitude }} /> : null}
            </MapView>
            {
                selectService === 3 ? <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#fff' }}>
                    <WebView
                        style={{
                            flex: 1,
                            marginBottom: ((35 * height) / 100) + 35,
                            top: 35
                        }}
                        source={{ uri: 'https://yandex.ru/metro/moscow' }}
                    />
                </View> : null
            }
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
            >
                <BottomSheetScrollView>
                    <Text style={styles.title}>Сервисы</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.cardScroll}>
                        {
                            services.map((object, index) => {
                                return (
                                    <TouchableOpacity
                                        key={object.id}
                                        onPress={() => setSelectService(object.id)}
                                        style={[
                                            styles.cardService,
                                            {
                                                marginLeft: index === 0 ? 20 : 0,
                                                borderColor: object.id === selectService ? '#FF0000' : 'transparent',
                                                borderWidth: 2
                                            }
                                        ]}
                                    >
                                        {
                                            serviceIcon[object.id]
                                        }
                                        <Text style={{ textAlign: 'center', marginTop: 5 }}>{object.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('AllServices')}
                        style={styles.allServices}
                    >
                        <Text style={styles.buttonText}>Все сервисы</Text>
                    </TouchableOpacity>
                    {
                        selectService !== 3 ? <TouchableOpacity onPress={() => props.navigation.navigate(serviceNavigate[selectService], { markers: markers, item: markers })} style={styles.searchInput}>
                            <Text style={{ flex: 1 }}>{servicePlaceholder[selectService]}</Text>
                            <Ionicons name='search-sharp' style={{ marginHorizontal: 15 }} size={25} />
                        </TouchableOpacity> : null
                    }
                    <Weather />
                    <News />
                </BottomSheetScrollView>
            </BottomSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
        zIndex: 0
    },
    title: {
        fontSize: 19,
        fontWeight: '600',
        marginHorizontal: 20
    },
    cardService: {
        width: 140,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    cardScroll: {
        marginTop: 10,
        marginBottom: 15
    },
    allServices: {
        marginHorizontal: 20,
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
    searchInput: {
        height: 55,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 15
    }
})

export default MainScreen