import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {getWeatherByCity, getWeatherByLocation} from '../services/weatherService';
import {getCurrentLocation} from '../services/locationService';
import {StatusBar} from "expo-status-bar";
import {useSettings} from "../context/SettingsContext";
import WeatherCard from "../components/WeatherCard";
import UnitToggle from "../components/UnitToggle";
import SaveLocationButton from "../components/SaveLocationButton";
import {FAB} from "react-native-paper";
import PermissionGuide from "../components/PermissionGuide";

const HomeScreen = ({route}) => {
    const [weather, setWeather] = useState(null)
    const {unit} = useSettings()
    const [isLoading, setIsLoading] = useState(true)
    const [isMounted, setIsMounted] = useState(true);
    const [error, setError] = useState(null)

    const fetchWeather = async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log(route)

            let weatherData;
            if (route.params?.city) {
                weatherData = await getWeatherByCity(route.params.city, unit);
            } else {
                const coords = await getCurrentLocation();
                if (!coords || !coords.latitude || !coords.longitude) {
                    throw new Error('Invalid location data');
                }
                weatherData = await getWeatherByLocation(coords.latitude, coords.longitude, unit);
            }

            if (isMounted) {
                setWeather(weatherData);
            }
        } catch (err) {
            if (isMounted) {
                let errorMessage = err.message;
                if (err.message.includes('permission')) {
                    errorMessage = 'Please enable location permissions in settings';
                } else if (err.message.includes('timeout')) {
                    errorMessage = 'Location request timed out. Please try again.';
                } else if (err.message.includes('location')) {
                    errorMessage = 'Unable to fetch your location';
                }
                setError(errorMessage);
            }
        } finally {
            if (isMounted) {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        setIsMounted(true)
        fetchWeather()
        return () => {
            setIsMounted(false);
        };
    }, [route.params?.city, unit])

    if (isLoading) {
        return (<View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2196F3"/>
        </View>);
    }
    if (error) {
        if (error?.includes('permission')) {
            return <PermissionGuide/>;
        }
    }


    return (<View style={styles.container}>
        <StatusBar style={"dark"}/>
        <WeatherCard weather={weather}/>

        <View style={styles.controlsContainer}>
            <UnitToggle/>
            {weather?.name && <SaveLocationButton city={weather.name}/>}
        </View>
        <FAB
            icon="reload"
            style={styles.fab}
            onPress={fetchWeather}
        />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: 16, backgroundColor: '#f5f5f5',
    }, loadingContainer: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    }, controlsContainer: {
        marginTop: 20, gap: 16,
    }, errorText: {
        color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20,
    }, fab: {
        position: 'absolute', margin: 16, right: 0, bottom: 0, backgroundColor: '#2196F3',
    },
})

export default HomeScreen