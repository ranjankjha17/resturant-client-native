import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const View_KOT = () => {
  const [data, setData] = useState([]);
console.log(data)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://resturant-server-mssql.vercel.app/api/viewKOT');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        scrollEnabled={false}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.Add1}</Text>
            {/* <Text>{item.Add2}</Text> */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
   
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection:'row'
  },
});

export default View_KOT;
