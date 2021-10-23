import React, { useRef, useMemo, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView from 'react-native-maps'
import { Fontisto, MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'

import News from '../Components/News'
import Weather from '../Components/Weather'

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

const serviceIcon = {
    0: <Fontisto name='train' size={29} />,
    1: <Fontisto name='bus' size={25} />,
    2: <FontAwesome5 name='parking' size={29} />,
    3: <MaterialCommunityIcons name='map-marker-path' size={28} />,
}

const { height } = Dimensions.get('screen')

const MainScreen = (props) => {
    const bottomSheetRef = useRef(null)
    const [selectService, setSelectService] = useState(0)

    const snapPoints = useMemo(() => ['38%', '90%'], [])

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
            />
            {
                selectService === 3 ? <View style={{ ...StyleSheet.absoluteFill, backgroundColor: '#fff' }}>
                    <WebView
                        style={{
                            flex: 1,
                            marginBottom: ((38 * height) / 100) + 35,
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
                    <TouchableOpacity style={styles.searchInput}>
                        <Text style={{ flex: 1 }}>Найти общественный транспорт</Text>
                        <Ionicons name='search-sharp' style={{ marginHorizontal: 15 }} size={25} />
                    </TouchableOpacity>
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