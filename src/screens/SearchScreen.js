import React, {useState} from 'react';
import {View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {getWeatherByCity} from '../services/weatherService';
import AntDesign from "@expo/vector-icons/AntDesign";

const SearchScreen = ({navigation}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const data = await getWeatherByCity(query);
            setResults([data]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{flex: 1, padding: 20}}>
            <View style={{flexDirection: "row", height: 40}}>
                <TextInput
                    placeholder="Search city"
                    value={query}
                    onChangeText={setQuery}
                    style={{borderWidth: 1, flex: 1, borderRadius: 8, paddingHorizontal: 8, height: 48}}
                />
                <View style={{
                    height: 48,
                    width: 48,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    marginStart: 10
                }}>
                    <AntDesign name={'search1'} size={20} onPress={handleSearch}/>

                </View>
            </View>

            <FlatList
                style={{marginTop: 16}}
                data={results}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Home', {city: item.name})} style={{
                        backgroundColor: '#C3C3C3FF',
                        borderWidth: 1,
                        borderColor: 'gray',
                        borderRadius: 8,
                        alignItems: 'flex-start',
                        height:32,
                        justifyContent:'center',
                        paddingStart:8
                    }}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default SearchScreen;