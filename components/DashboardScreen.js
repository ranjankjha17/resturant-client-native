import React from 'react';
import { View, Text, Button, StyleSheet,ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../reducers/login';
import OrderForm  from './OrderForm';
import OrderList from './OrderList';
import RestaurantOrderGrid from './RestaurantOrderGrid';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout()); 
    try {
      
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.log('Error clearing token:', error);
    }

    navigation.navigate('Login'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
      <View >
       <OrderForm/>
        <OrderList/>
       <RestaurantOrderGrid />    
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScreen;
