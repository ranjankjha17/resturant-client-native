import React from 'react'
import { StyleSheet,View,Image } from 'react-native'
const Logo = () => {
  return (
    <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo2.bmp')} 
        // source={{
        //     uri: 'https://raw.githubusercontent.com/ranjankjha17/resturant-client-native/main/assets/logo2.bmp',
        //   }}
          style={styles.logo}
        />
      </View>
  )
}

export default Logo

const styles = StyleSheet.create({  
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