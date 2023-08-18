import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../reducers/order';

const RestaurantOrderGrid = () => {
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

    return (
      <ScrollView style={styles.container}>
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
        {filteredOrders.map((order) => (
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

  // {filteredOrders.map((order) => (
  //   <View key={order.pid} style={styles.orderRow}>
  //     <View style={styles.orderItem}>
  //       <Text>Code: {order?.pid}</Text>
  //       <Text>Name: {order?.name}</Text>
  //       <Text>Rate: {order?.rate}</Text>
  //     </View>
  //     <View style={styles.orderItem}>
  //       <Text>DeptName: {order?.dept_name}</Text>
  //       <Text>Dept: {order?.dept}</Text>
  //     </View>
  //   </View>
  // ))}

    );

  // const renderItem = ({ item }) => (
  //   <View style={styles.formRow}>
  //     <Text style={styles.grid_label}>{item?.pid}</Text>
  //     <Text style={styles.grid_label}>{item?.name}</Text>
  //     <Text style={styles.grid_label}>{item?.rate}</Text>
  //     <Text style={styles.grid_label}>{item?.acrate}</Text>
  //     <Text style={styles.grid_label}>{item?.dept_name}</Text>
  //     <Text style={styles.grid_label}>{item?.dept}</Text>
  //   </View>
  // );

  // return (
  //   <ScrollView>
  //     <View Style={styles.container}>
  //       {/* <View style={styles.formRow}>
  //       <Text style={styles.grid_heading}>Code</Text>
  //       <Text style={styles.grid_heading}>Name</Text>
  //       <Text style={styles.grid_heading}>Rate</Text>
  //       <Text style={styles.grid_heading}>AC Rate</Text>
  //       <Text style={styles.grid_heading}>Dept No</Text>
  //       <Text style={styles.grid_heading}>Dept Name</Text>
  //     </View> */}
  //       {/* <ListDesign/> */}
  //       <FlatList
  //       //  showsHorizontalScrollIndicator={false}        
  //       // horizontal={false}
  //       showsVerticalScrollIndicator={true}
  //         data={filteredOrders}
  //         renderItem={renderItem}
  //         keyExtractor={(item) => item.pid.toString()}
  //       />
  //     </View>
  //   </ScrollView>
  // );

};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    height:300
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
    fontWeight:500
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#4c5156',
    backgroundColor:'#fffefe',
    color:'#5b5f61',
    padding: 8,
  },
//   input: {
//     flex: 2,
//     borderWidth: 1,
//     borderColor: '#4c5156',
//     padding: 8,
//     marginLeft: 10,
//     backgroundColor:'#fffefe',
//     color:'#5b5f61'
// },
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
    color:'#04070b'
},
grid_heading: {
  flex: 1,
  fontSize: 10,
  fontWeight:'bold',
  color:'#888f94'
},
});


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   formRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   grid_heading: {
//     fontWeight: 'bold',
//     flex: 1,
//   },
//   grid_label: {
//     flex: 1,
//   },
// });


const ListDesign = () => {
  return (
    <View style={styles.formRow}>
      <Text style={styles.grid_heading}>Code</Text>
      <Text style={styles.grid_heading}>Name</Text>
      <Text style={styles.grid_heading}>Rate</Text>
      <Text style={styles.grid_heading}>AC Rate</Text>
      <Text style={styles.grid_heading}>Dept No</Text>
      <Text style={styles.grid_heading}>Dept Name</Text>
    </View>
  )
}
export default RestaurantOrderGrid;


{/* <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
  <View style={styles.container}>
              <SelectBox
                label=""
                inputPlaceholder="Selecciona"
                options={DATA}
                value={selectedTeam}
                onChange={(val) => setSelectedTeam(val)}
                hideInputFilter={true}
              />
    </View>
</ScrollView> */}


// <ScrollView nestedScrollEnabled={true}>
// <View style={styles.promotiomSliderContainer}>
//   <SliderBox
//     images={slides}
//     sliderBoxHeight={140}
//     dotColor={colors.primary}
//     inactiveDotColor={colors.muted}
//     paginationBoxVerticalPadding={10}
//     autoplayInterval={6000}
//   />
// </View>
// <View style={styles.primaryTextContainer}>
//   <Text style={styles.primaryText}>Categories</Text>
// </View>
// <View style={styles.categoryContainer}>
//   <FlatList
//     showsHorizontalScrollIndicator={false}
//     style={styles.flatListContainer}
//     horizontal={true}
//     data={category}
//     keyExtractor={(item, index) => `${item}-${index}`}
//     renderItem={({ item, index }) => (
//       <View style={{ marginBottom: 10 }} key={index}>
//         <CustomIconButton
//           key={index}
//           text={item.title}
//           image={item.image}
//           onPress={() =>
//             navigation.jumpTo("categories", { categoryID: item })
//           }
//         />
//       </View>
//     )}
//   />
//   <View style={styles.emptyView}></View>
// </View>
// <View style={styles.primaryTextContainer}>
//   <Text style={styles.primaryText}>New Arrivals</Text>
// </View>
// {products.length === 0 ? (
//   <View style={styles.productCardContainerEmpty}>
//     <Text style={styles.productCardContainerEmptyText}>
//       No Product
//     </Text>
//   </View>
// ) : (
//   <View style={styles.productCardContainer}>
//     <FlatList
//       refreshControl={
//         <RefreshControl
//           refreshing={refeshing}
//           onRefresh={handleOnRefresh}
//         />
//       }
//       showsHorizontalScrollIndicator={false}
//       initialNumToRender={5}
//       horizontal={true}
//       data={products.slice(0, 4)}
//       keyExtractor={(item) => item._id}
//       renderItem={({ item, index }) => (
//         <View
//           key={item._id}
//           style={{ marginLeft: 5, marginBottom: 10, marginRight: 5 }}
//         >
//           <ProductCard
//             name={item.title}
//             image={`${network.serverip}/uploads/${item.image}`}
//             price={item.price}
//             quantity={item.quantity}
//             onPress={() => handleProductPress(item)}
//             onPressSecondary={() => handleAddToCat(item)}
//           />
//         </View>
//       )}
//     />
//     <View style={styles.emptyView}></View>
//   </View>
// )}
// </ScrollView>