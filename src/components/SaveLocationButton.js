import React from 'react';
import { Button } from 'react-native';
import { auth } from '../Firebase';
import { saveLocation } from '../services/firestoreService';

const SaveLocationButton = ({ city }) => {
    const userId = auth.currentUser?.uid;

    const handleSave = async () => {
        if (!userId || !city) return;
        await saveLocation(userId, city);
    };

    return <Button title="Save Location" onPress={handleSave} />;
};

export default SaveLocationButton;