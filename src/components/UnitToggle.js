import React, {useState} from "react";
import {Button} from "react-native";
import {useSettings} from "../context/SettingsContext";

const UnitToggle = () => {
    const context = useSettings();
    const unit = context?.unit || 'metric';
    const toggleUnit = context?.toggleUnit || (() => {});
    return (
        <Button
            title={`Switch to ${unit === 'metric' ? 'imperial' : 'metric'}`}
            onPress={toggleUnit}>
        </Button>)
}
export default UnitToggle