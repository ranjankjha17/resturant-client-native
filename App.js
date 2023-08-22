import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import { Provider } from 'react-redux';
import store from './store/store';
import {  StyleSheet} from 'react-native';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import {ErrorBoundary} from 'react-error-boundary'
import { View,Text } from 'react-native';

const Stack = createStackNavigator();

function ErrorHandler() {
  return (
    <View role="alert">
      <Text>An error occurred:</Text>
      {/* <Text>{error.message}</Text> */}
     
    </View>
  )
}


export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4fc'
  },


});
