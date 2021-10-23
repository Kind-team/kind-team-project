import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from './Screens/MainScreen'

const Stack = createNativeStackNavigator()

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                mode='modal'
            >
                <Stack.Screen name='Main' component={MainScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router