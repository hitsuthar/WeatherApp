import React, {useEffect, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {auth, db} from '../Firebase';
import {doc, onSnapshot} from 'firebase/firestore';

const SavedLocationsScreen = ({navigation}) => {
    const [savedLocations, setSavedLocations] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const userRef = doc(db, 'users', userId);
        return onSnapshot(userRef, (doc) => {
            const data = doc.data();
            setSavedLocations(data?.savedLocations || []);
        });
    }, [])

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Home', {city: item})} style={{
            backgroundColor: '#C3C3C3FF',
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 8,
            alignItems: 'flex-start',
            height:32,
            justifyContent:'center',
            paddingStart:8,
            marginBottom:8
        }}>
            <Text>{item}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <FlatList
                data={savedLocations}
                renderItem={renderItem}
                keyExtractor={(item) => item}
            />
        </View>
    )
}

export  default SavedLocationsScreen