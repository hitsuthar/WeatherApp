import React from 'react';
import { Text, TouchableOpacity} from 'react-native';
import {auth} from '../Firebase';
import {saveLocation} from '../services/firestoreService';

const SaveLocationButton = ({city}) => {
    const userId = auth.currentUser?.uid;

    const handleSave = async () => {
        if (!userId || !city) return;
        await saveLocation(userId, city);
    };

    return (
        <TouchableOpacity onPress={handleSave}
                          style={{
                              backgroundColor: 'black',
                              borderRadius: 20,
                              height: 48,
                              alignItems: 'center',
                              justifyContent: 'center'
                          }}>
            <Text style={{color: 'white', fontSize:18}}>
                Save Location
            </Text>
        </TouchableOpacity>
    )
};

export default SaveLocationButton;