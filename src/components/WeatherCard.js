import React from 'react';
import {Card, Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSettings} from '../context/SettingsContext';
import {Text, View} from "react-native";

const WeatherCard = ({weather}) => {
    const {unit} = useSettings();
    const temperature = weather?.main?.temp;

    return (
        <Card style={{margin: 10, padding: 20}}>
            <Card.Content>
                <Title>{weather.name}</Title>
                <Title style={{fontSize: 24}}>
                    {Math.round(temperature)} {unit === 'metric' ? '°C' : '°F'}
                </Title>

                <Paragraph>{weather?.weather[0]?.description}</Paragraph>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Icon name="water" size={20}/>
                    <Paragraph>Humidity: {weather?.main?.humidity}%</Paragraph>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Icon name="weather-windy" size={20}/>
                    <Paragraph>Wind: {weather?.wind?.speed} m/s</Paragraph>
                </View>
            </Card.Content>
        </Card>
    );
};

export default WeatherCard;