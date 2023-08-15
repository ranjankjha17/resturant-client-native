// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; 
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Import your Redux actions and reducers accordingly
// import { addNewLogin, login, loginFailure, loginRequest, loginSuccess } from '../reducers/login';

// const Login = () => {
//   const navigation = useNavigation(); // Use your navigation hook here
//   const [users, setUsers] = useState({
//     email: '',
//     password: ''
//   });
//   const dispatch = useDispatch();
//   const { error, isLoggedIn, isLoading } = useSelector(state => state.auth);

//   useEffect(() => {
//     // Use AsyncStorage to get token
//     const getToken = async () => {
//       const token = await AsyncStorage.getItem('token');
//       if (token) {
//         dispatch(loginSuccess(token));
//       }
//     };
//     getToken();
//   }, [dispatch]);

//   const handleChange = (name, value) => {
//     setUsers({
//       ...users,
//       [name]: value
//     });
//   };

//   const handleSubmit = async () => {
//     if (users.email === '' || users.password === '') {
//       return;
//     } else {
//       dispatch(loginRequest());
//       try {
//         const token = await addNewLogin(users);
//         dispatch(loginSuccess(token));
//         dispatch(login({ ...users }));
//       } catch (error) {
//         dispatch(loginFailure(error.message));
//       }
//     }
//   };

//   if (isLoggedIn) {
//     navigation.navigate('Dashboard'); // Navigate to the Dashboard screen
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={users.email}
//         onChangeText={value => handleChange('email', value)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={users.password}
//         onChangeText={value => handleChange('password', value)}
//       />
//       <Button
//         title="Login"
//         onPress={handleSubmit}
//         disabled={isLoading}
//       />
//       {error && <Text style={styles.error}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#017f87',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   error: {
//     color: 'red',
//     marginTop: 10,
//   },
// });

// export default Login;
