import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'; // Changed ScrollView to FlatList
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems } from '../reducers/order';
import { ScrollView } from 'react-native';

const FlatListOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleSearch = (text) => {
    setSearchTerm(text);
  };

  const filteredOrders = orders?.filter((order) =>
    order.name?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  if (!orders || orders.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey",marginHorizontal:10}} />;
    };
  
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
      <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.searchContainer}>
        <Text style={styles.label}>Search Item By Name</Text>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={handleSearch}
          placeholder="Search Name"
        />
      </View>
      <View style={styles.formRow}>
        <Text style={styles.grid_heading}>Code</Text>
        <Text style={styles.grid_heading}>Name</Text>
        <Text style={styles.grid_heading}>Rate</Text>
        <Text style={styles.grid_heading}>AC Rate</Text>
        <Text style={styles.grid_heading}>Dept Name</Text>
        <Text style={styles.grid_heading}>Dept No</Text>
      </View> */}
      <FlatList
    //    ItemSeparatorComponent={myItemSeparator}
    //    ListEmptyComponent={myListEmpty}      
    //   ListHeaderComponent={() => (
    //     <Text style={{ fontSize: 30, textAlign: "center",marginTop:20,fontWeight:'bold',textDecorationLine: 'underline' }}>
    //       List of Persons
    //     </Text>
    //   )}
    //   ListFooterComponent={() => (
    //     <Text style={{ fontSize: 30, textAlign: "center",marginBottom:20,fontWeight:'bold' }}>Thank You</Text>
    //   )}
        data={filteredOrders}
        scrollEnabled={false}
        keyExtractor={(order) => order.pid.toString()} // Assuming `pid` is a unique identifier
        contentContainerStyle={styles.scrollView} // No need for this, as FlatList handles it internally
        renderItem={({ item: order }) => (
          <View style={styles.formRow}>
            <Text style={styles.grid_label}>{order?.pid}</Text>
            <Text style={styles.grid_label}> {order?.name}</Text>
            <Text style={styles.grid_label}> {order?.rate}</Text>
            <Text style={styles.grid_label}>{order?.acrate}</Text>
            <Text style={styles.grid_label}> {order?.dept_name}</Text>
            <Text style={styles.grid_label}> {order?.dept}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    marginTop: 5,
    fontSize: 30,
    height:200,
  },
  scrollView: {
    flexGrow: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
    color: '#0c3761',
    fontWeight: '500', // fontWeight should be a string
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4c5156',
    backgroundColor: '#fffefe',
    color: '#5b5f61',
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  grid_label: {
    flex: 1,
    fontSize: 10,
    color: '#04070b',
  },
  grid_heading: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#888f94',
  },
});

export default FlatListOrder;
