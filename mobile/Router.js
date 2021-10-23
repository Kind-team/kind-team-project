import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainScreen from './Screens/MainScreen'
import AllServices from './Screens/AllServices'
import SearchMetroScreen from './Screens/SearchMetroScreen'
import SearchTransportScreen from './Screens/SearchTransportScreen'
import SearchParkingScreen from './Screens/SearchParkingScreen'

const Stack = createNativeStackNavigator()

const Router = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ presentation: 'modal' }}
                >
                    <Stack.Screen
                        options={{
                            headerShown: false
                        }}
                        name='Main'
                        component={MainScreen}
                    />
                    <Stack.Screen
                        name='AllServices'
                        component={AllServices}
                        options={{
                            headerShown: false
                        }}
                    />
                     <Stack.Screen
                        name='SearchMetro'
                        component={SearchMetroScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                     <Stack.Screen
                        name='SearchTransport'
                        component={SearchTransportScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                     <Stack.Screen
                        name='SearchParking'
                        component={SearchParkingScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default Router