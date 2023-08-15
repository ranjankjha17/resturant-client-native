import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../reducers/login';
import { createLogin } from '../services/userService';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navigation = useNavigation();

    const [userID, setUSerID] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleLogin = async () => {
        console.log('userID:', userID);
        console.log('Password:', password);
        let data = { userID, password }
        let response = await createLogin(data)
        console.log(response.token)
        const token = response.token

        dispatch(login());
        try {
            await AsyncStorage.setItem('token', token); // Replace with the actual token
        } catch (error) {
            console.log('Error storing token:', error);
        }


        if (token) {
           
            navigation.navigate('DashboardScreen');
        }
    };
    // useEffect(() => {
    //     let isLoggedIn = checkLoggedInStatus()
    //     if (isLoggedIn) {
    //         navigation.navigate('DashboardScreen');
    //     }else{
    //         navigation.navigate('LoginScreen')
    //     }
    // }, [])
    const checkLoggedInStatus = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        console.log(storedToken)
        if (storedToken) {
            dispatch(login());
        }
    };

    if (!isLoggedIn) {
        checkLoggedInStatus();
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="UserID"
                value={userID}
                onChangeText={setUSerID}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    }
});

export default LoginScreen;
