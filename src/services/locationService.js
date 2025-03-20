import Geolocation from '@react-native-community/geolocation';
import {PermissionsAndroid, Platform} from "react-native";

export const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED
        } catch (err) {
            console.warn(err)
            return false
        }
    }
    return true;
}
export const getCurrentLocation = async () => {
    try {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            throw new Error('Location permission denied');
        }

        const position = await new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                resolve,
                reject,
                { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
            );
        });
        console.log(position)

        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
    } catch (error) {
        console.error('Error getting location:', error);
        throw new Error('Unable to fetch location');
    }
};