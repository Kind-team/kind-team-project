import React, { useRef, useMemo, useCallback, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import BottomSheet, { useBottomSheetDynamicSnapPoints, BottomSheetView } from '@gorhom/bottom-sheet'
import { ScrollView } from 'react-native-gesture-handler'
import MapView from 'react-native-maps'
import SearchMetro from '../Components/SearchMetro'
import SearchTransport from '../Components/SearchTransport'
import SearchParking from '../Components/SearchParking'


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

    const snapPoints = useMemo(() => ['CONTENT_HEIGHT', '90%'], [])

    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(snapPoints)

    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 55.751244,
                    longitude: 37.618423,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
            />
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={animatedSnapPoints}
                handleHeight={animatedHandleHeight}
                contentHeight={animatedContentHeight}
            >
                <BottomSheetView
                    style={styles.contentContainer}
                    onLayout={handleContentLayout}
                >
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
                    {
                        serviceContent[selectService]
                    }
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
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
        marginBottom: 20
    },
    searchInput: {
        height: 55,
        backgroundColor: '#EFEFF4',
        borderRadius: 10,
        marginHorizontal: 20,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default MainScreen