import React, { useState, useEffect } from 'react';
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
        if (
            userID === '' ||
            password === ''

        ) {
            alert('UserID and Password are required');

        } else {
            console.log('userID:', userID);
            console.log('Password:', password);
            let data = { userID, password }
            let response = await createLogin(data)
            console.log(response.token)
            const token = response.token
            await AsyncStorage.setItem('loginToken', token);
            AsyncStorage.setItem('loginUserID', userID);
            dispatch(login(userID));
        };
    }
  
    useEffect(() => {
        checkLoggedInStatus()
        if (isLoggedIn) {
            navigation.navigate('DashboardScreen');
        }
    }, [dispatch,isLoggedIn])
    const checkLoggedInStatus = async () => {
        const storedToken = await AsyncStorage.getItem('loginToken');
        console.log(storedToken)
        if (storedToken) {
            dispatch(login(userID));
        }
    };

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
            <View style={styles.button_area}>
                <Button title="Login" onPress={handleLogin} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'#003c75'
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        // color:"#ffffff"
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    // button_area: {
    //     backgroundColor: '#fff',
    //     borderRadius: 5,
    //     paddingHorizontal: 20,
    //     paddingVertical: 10,
    //     color: "#003c75",

    // },
});

export default LoginScreen;
