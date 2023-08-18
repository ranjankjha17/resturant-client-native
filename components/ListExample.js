import React from 'react'
import {FlatList, StyleSheet, Text, View,ScrollView,Image} from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
};

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       paddingTop: 22,
//     },
//     item: {
//       padding: 10,
//       fontSize: 18,
//       height: 44,
//     },
//   });
const ListExample = () => {
  return (
  //   <View>
  //   <View style={styles.container}>
  //   <FlatList
  //     data={[
  //       {key: 'Devin'},
  //       {key: 'Dan'},
  //       {key: 'Dominic'},
  //       {key: 'Jackson'},
  //       {key: 'James'},
  //       {key: 'Joel'},
  //       {key: 'John'},
  //       {key: 'Jillian'},
  //       {key: 'Jimmy'},
  //       {key: 'Julie'},
  //     ]}
  //     renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
  //   />
  // </View>
  // </View>
 
  <ScrollView>
  <Text style={{fontSize: 96}}>Scroll me plz</Text>
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Text style={{fontSize: 96}}>If you like</Text>
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Text style={{fontSize: 96}}>Scrolling down</Text>
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Text style={{fontSize: 96}}>What's the best</Text>
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Text style={{fontSize: 96}}>Framework around?</Text>
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Image source={logo} />
  <Text style={{fontSize: 80}}>React Native</Text>
</ScrollView>
 
  )
}

export default ListExample