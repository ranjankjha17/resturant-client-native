import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import { createStackNavigator } from '@react-navigation/stack'; // Import StackNavigator
import { Provider } from 'react-redux';
import store from './store/store';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    // <ScrollView style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    // </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4fc'
  },


});
