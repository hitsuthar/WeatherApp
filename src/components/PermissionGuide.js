import React from 'react';
import { View, Text, Button, Linking } from 'react-native';
const PermissionGuide = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
            Location permission is required to show local weather
        </Text>
        <Button
            title="Open Settings"
            onPress={() => Linking.openSettings()}
        />
    </View>
);

export default PermissionGuide;