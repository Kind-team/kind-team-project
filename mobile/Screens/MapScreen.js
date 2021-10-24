import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions'
const MapScreen = ({ route }) => {
    const [myPosition, setMyPosition] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [fromlocation, setFromlocation] = useState(null)
    const { from } = route?.params

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setMyPosition(location);
        })();
    }, []);

    useEffect(() => {
        setFromlocation(from)
    })

    
    return (
        <MapView
        initialRegion={{
            latitude: 55.751244,
            longitude: 37.618423,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
        }}
        style={styles.map}
    >
        {fromlocation ? <MapViewDirections
            origin={{ latitude: fromlocation?.coordinate.latitude, longitude: fromlocation?.coordinate.longitude }}
            destination={{ latitude: myPosition?.coords.latitude, longitude: myPosition?.coords.longitude }}
            apikey={'AIzaSyC1rO31QNgNc8_Fruu6gui2QsH9qtEOBaI'}
            strokeWidth={5}
            mode={"WALKING"}
            lineDashPattern={[1]}
            strokeColor={'red'}
        /> : null}
        {myPosition ? <Marker coordinate={{ latitude: myPosition?.coords.latitude, longitude: myPosition?.coords.longitude }} /> : null}
    </MapView>
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
    }
})


export default MapScreen