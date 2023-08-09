import React from 'react'
//import { Image } from 'expo-image';

import { StyleSheet,View,Image } from 'react-native'
const Logo = () => {
    const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo2.bmp')} 
        // source={{
        //     uri: 'https://ibb.co/DWdz1hW',
        //   }}
          style={styles.logo}
        />
        {/* <Image
        style={styles.logo}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      /> */}
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