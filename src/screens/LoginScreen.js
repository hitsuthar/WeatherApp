import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {auth} from '../Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {TextInput} from 'react-native-paper'
import ErrorDialog from "../components/ErrorDialog";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Home');
        } catch (error) {
            setError(error.message); // Set the error message
            setDialogVisible(true); // Show the dialog
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return (<View style={styles.container}>
        <Text style={{fontSize: 48, fontWeight: 'bold', marginBottom: 12,}}>
            Login!!!
        </Text>

        <TextInput label="Email" value={email} onChangeText={setEmail} mode={"outlined"}
                   style={{height: 48, paddingHorizontal: 8, marginBottom: 8}}/>
        <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry mode={"outlined"}
                   style={{height: 48, paddingHorizontal: 8}}/>

        <TouchableOpacity onPress={handleLogin} disabled={loading || dialogVisible} style={{
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
            <Text style={{fontSize: 24, color: 'white'}}>Login</Text>
        </TouchableOpacity>
        <ErrorDialog
            visible={dialogVisible}
            message={error}
            onDismiss={() => setDialogVisible(false)}
        />
        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 12}}>
            <Text>Dont have account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')} disabled={loading || dialogVisible}>
                <Text style={{fontWeight: 'bold'}}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'white'
    },
})

export default LoginScreen