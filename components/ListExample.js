import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../reducers/order';

const INITIAL_ROWS_TO_RENDER = 5; // Adjust as needed
const ADDITIONAL_ROWS_TO_LOAD = 3; // Adjust as needed
const ListExample = () => {
  const [visibleRowCount, setVisibleRowCount] = useState(INITIAL_ROWS_TO_RENDER);
  const [searchTerm, setSearchTerm] = useState('');
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
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


  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndReached = contentOffset.y + layoutMeasurement.height >= contentSize.height;

    if (isEndReached) {
      // Load more rows when the end of the content is reached
      setVisibleRowCount(visibleRowCount + ADDITIONAL_ROWS_TO_LOAD);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={styles.searchContainer}>
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
      </View>
      {filteredOrders.slice(0, visibleRowCount).map((order) => (
        <View key={order.pid} style={styles.formRow}>
          <Text style={styles.grid_label}>{order?.pid}</Text>
          <Text style={styles.grid_label}> {order?.name}</Text>
          <Text style={styles.grid_label}> {order?.rate}</Text>
          <Text style={styles.grid_label}>{order?.acrate}</Text>
          <Text style={styles.grid_label}> {order?.dept_name}</Text>
          <Text style={styles.grid_label}> {order?.dept}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    //height:300
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
    fontWeight: 500
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4c5156',
    backgroundColor: '#fffefe',
    color: '#5b5f61',
    padding: 8,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    flex: 1,
    borderRadius: 5,
    marginRight: 10,
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
    color: '#04070b'
  },
  grid_heading: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#888f94'
  },
});





export default ListExample