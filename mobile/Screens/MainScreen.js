import React, { useRef, useMemo, useCallback, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import { WebView } from 'react-native-webview'
import MapView from 'react-native-maps'
import SearchMetro from '../Components/SearchMetro'
import SearchTransport from '../Components/SearchTransport'
import SearchParking from '../Components/SearchParking'
import News from '../Components/News'



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

const serviceContent = {
    0: <SearchMetro />,
    1: <SearchTransport />,
    2: <SearchParking />,
    3: null
}

const MainScreen = () => {
    const bottomSheetRef = useRef(null)
    const [selectService, setSelectService] = useState(0)

    const snapPoints = useMemo(() => ['34%', '95%'], [])

    return (
        <View style={styles.container}>
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
                            marginBottom: 320,
                            top: 35
                        }}
                        source={{ uri: 'https://yandex.ru/metro/moscow' }}
                        originWhitelist={['https://yandex.ru/metro/*']}
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
                                                borderColor: '#FF0000',
                                                borderWidth: object.id === selectService ? 2.5 : 0
                                            }
                                        ]}
                                    >
                                        <Text style={{ textAlign: 'center' }}>{object.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    <TouchableOpacity style={styles.allServices}>
                        <Text style={styles.buttonText}>Все сервисы</Text>
                    </TouchableOpacity>
                    {
                        serviceContent[selectService]
                    }
                    <News />
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
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
        height: 70,
        width: 140,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardScroll: {
        marginTop: 10,
        maxHeight: 70,
        marginBottom: 15
    },
    searchInput: {
        height: 55,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        marginHorizontal: 20,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
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
    }
})

export default MainScreen