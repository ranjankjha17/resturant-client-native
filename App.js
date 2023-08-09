import { createStackNavigator } from '@react-navigation/stack';
import OrderForm from './components/OrderForm';
import { Provider } from 'react-redux';
import store from './store/store';
import { View, Image, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        {/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={CharacterSearch} />
          <Stack.Screen name="Character" component={SingleCharacter} />
        </Stack.Navigator>
      </NavigationContainer> */}
       <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logo2.bmp')} // Replace with your logo's path
          style={styles.logo}
        />
      </View>
        <OrderForm />
        {/* <ItemSearchForm/> */}
      </Provider>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef4fc'
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, 
    padding:20
  },
  logo: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain', 
  },

});
