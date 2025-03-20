import React, {createContext, useContext, useState} from 'react';

const SettingsContext = createContext();
export const SettingsProvider = ({children}) => {
    const [unit, setUnit] = useState('metric');

    const toggleUnit = () => {
        setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));
    };

    return (
        <SettingsContext.Provider value={{unit, toggleUnit}}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);