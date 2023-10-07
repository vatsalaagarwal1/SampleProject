import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { UserListScreen } from './src/screens/UserListScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TeamDetailsScreen from './src/screens/TeamDetailsScreen'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='UserListScreen' component={UserListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TeamDetails" component={TeamDetailsScreen} options={{ headerShown: false }} />
      </Stack.Navigator>

    </NavigationContainer>
    // <View>
    //   <UserListScreen />
    // </View>
  )
}

const styles = StyleSheet.create({})