import React, {useState} from 'react';
import {View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {auth} from '../Firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {StatusBar} from "expo-status-bar";
import {TextInput} from "react-native-paper";

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style={"dark"}/>
            <Text style={{fontSize: 48, fontWeight: 'bold', marginBottom:12,}}>
                Sign Up!!!
            </Text>
            <TextInput label="Email" value={email} onChangeText={setEmail} mode={"outlined"}
                       style={{height: 48, paddingHorizontal: 8, marginBottom: 8}}/>
            <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry mode={"outlined"}
                       style={{height: 48, paddingHorizontal: 8}}/>
            <TouchableOpacity onPress={handleSignup} style={{
                borderRadius: 18,
                backgroundColor: 'black',
                width: '100%',
                paddingVertical: 8,
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 16
            }}>
                <Text style={{fontSize: 24, color: 'white'}}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor:'white'
    },
})

export default SignupScreen