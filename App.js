import * as React from 'react'
import {useEffect, useState} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {auth} from './src/Firebase';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign';
import HomeScreen from './src/screens/HomeScreen'
import {SettingsProvider} from './src/context/SettingsContext'
import SavedLocationsScreen from "./src/screens/SavedLocationsScreen";
import {NavigationContainer} from "@react-navigation/native";
import LoginScreen from "./src/screens/LoginScreen";
import signupScreen from "./src/screens/SignupScreen";
import SearchScreen from "./src/screens/SearchScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainNavigator = ({route}) => (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
            let iconName
            if (route.name === "Home") iconName = 'home'
            else if (route.name === "Search") iconName = 'search1'
            else if (route.name === "Saved") iconName = 'save'
            return <AntDesign name={iconName} size={size} color={color}/>
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false
    })}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Search" component={SearchScreen}/>
        <Tab.Screen name="Saved" component={SavedLocationsScreen}/>
    </Tab.Navigator>
)

const AppNavigator = () => {
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        return auth.onAuthStateChanged(currentUser => {
            setUser(currentUser)
            if (initializing) setInitializing(false)
        })
    }, []);

    if (initializing) return null

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {backgroundColor: "#2196F3"},
                headerTintColor: "white"
            }} initialRouteName={user ? 'Main' : 'Login'}>
                {!user ? (<>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false}}/>
                    <Stack.Screen name="Signup" component={signupScreen} options={{headerShown: false}}/>
                </>) : (<>
                    <Stack.Screen name="Main" component={MainNavigator} options={{headerShown: false}}/>
                </>)}

            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default function App() {
    return (
        <SettingsProvider>
            <AppNavigator/>
        </SettingsProvider>
    )
}