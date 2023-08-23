import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, loginFailure } from '../reducers/login';
import { createLogin } from '../services/userService';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import Logo2 from './Logo2';

const LoginScreen = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const loginError = useSelector(state => state.auth.error)
    const navigation = useNavigation();
    const [userID, setUSerID] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        if (
            userID === '' ||
            password === ''

        ) {
            setErrorMessage('UserID and Password are required');

        } else {
            setErrorMessage('');
            //console.log('userID:', userID);
            //console.log('Password:', password);
            let data = { userID, password }
            let response = await createLogin(data, dispatch)
            if (response) {
                const token = response.token
                await AsyncStorage.setItem('loginToken', token);
                AsyncStorage.setItem('loginUserID', userID);
                dispatch(login(userID));
                setUSerID('')
                setPassword('')
                setErrorMessage('');
            }


        };
    }
    useEffect(() => {
        checkLoggedInStatus()
        if (isLoggedIn) {
            navigation.navigate('DashboardScreen');
        }
    }, [dispatch, isLoggedIn])
    const checkLoggedInStatus = async () => {
        const storedToken = await AsyncStorage.getItem('loginToken');
        //  console.log(storedToken)
        if (storedToken) {
            dispatch(login(userID));
        }
    };


    const memoizedLogin = useMemo(() => (
        <View style={{backgroundColor:'#eef4fc'}}>
            <View>
                <Logo2 style={styles.logo} />
            </View>
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
                {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
                {loginError && <Text style={styles.errorText}>{loginError}</Text>}
                <View style={styles.button_area}>
                    <Text onPress={handleLogin} style={styles.label}>Login</Text>
                </View>
            </View>
        </View>
    ), [userID, password, loginError, errorMessage]);

    return memoizedLogin;
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: '#eef4fc',
       //height:'100vh'
    },
    logo: {
        // flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#0c3761',
        fontWeight: 500,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderColor: '#4c5156',
        backgroundColor: '#fffefe',
        color: '#5b5f61',
    },
    button_area: {
        backgroundColor: '#003c75',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    label: {
        fontSize: 16,
        color: '#d9e9f9',
        fontWeight: 500
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 500
    },
});

export default LoginScreen;
