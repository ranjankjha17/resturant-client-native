import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../reducers/login';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import RestaurantOrderGrid from './RestaurantOrderGrid';
import FlatListExample from './FlatListExample';
import { useState } from 'react';
import { useEffect } from 'react';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { userID, isLoggedIn } = useSelector(state => state.auth)
  //console.log(userID, isLoggedIn)
  const [user_ID, setUser_ID] = useState('')
  const handleLogout = async () => {
    dispatch(logout());
    try {

      await AsyncStorage.removeItem('loginToken');
    } catch (error) {
      console.log('Error clearing token:', error);
    }

    navigation.navigate('LoginScreen');
  };

  const getUserID = async () => {
    let userid = await AsyncStorage.getItem('loginUserID')
    setUser_ID(userID ? userID : userid)
  }

  useEffect(() => {
    getUserID()
  }, [user_ID])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end", paddingRight: 20, paddingTop: 10 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      {
        user_ID === 'admin'
          ?
          (<FlatListExample/>)
          :
          (
            <>
              <OrderForm />
              <OrderList />
              <RestaurantOrderGrid />              
            </>
          )
      }

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef4fc',
    justifyContent: 'center',
    

  },
});

export default DashboardScreen;
