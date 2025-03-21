import React from "react";
import { Text, TouchableOpacity} from "react-native";
import {useSettings} from "../context/SettingsContext";

const UnitToggle = () => {
    const context = useSettings();
    const unit = context?.unit || 'metric';
    const toggleUnit = context?.toggleUnit || (() => {
    });
    return (
        <TouchableOpacity onPress={toggleUnit}
                          style={{
                              backgroundColor: 'black',
                              borderRadius: 20,
                              height: 48,
                              alignItems: 'center',
                              justifyContent: 'center'
                          }}>
            <Text style={{color: 'white', fontSize: 18}}>
                Switch to {unit === 'metric' ? 'imperial' : 'metric'}
            </Text>
        </TouchableOpacity>
    )
}
export default UnitToggle