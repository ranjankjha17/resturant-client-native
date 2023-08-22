import React from 'react';
import { View, Text, Button, StyleSheet,ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../reducers/login';
import OrderForm  from './OrderForm';
import OrderList from './OrderList';
import RestaurantOrderGrid from './RestaurantOrderGrid';
import ListExample from './ListExample';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout()); 
    try {
      
      await AsyncStorage.removeItem('loginToken');
    } catch (error) {
      console.log('Error clearing token:', error);
    }

    navigation.navigate('LoginScreen'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{flexDirection:"row",justifyContent:"flex-end",paddingRight:20,paddingTop:10}}>
      <Button title="Logout" onPress={handleLogout} />
      </View>
       <OrderForm/>
         <OrderList/> 
       <RestaurantOrderGrid />    
      
   {/* <ListExample/> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {  
    backgroundColor: '#eef4fc',
  },
});

export default DashboardScreen;
