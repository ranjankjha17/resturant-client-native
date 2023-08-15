// StudentList.js
import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, deleteStudent, loadStudents } from '../reducers/temp_order';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OrderList({ data }) {
  const students = useSelector(state => state.tempOrder.students);
  console.log(students)
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadStoredStudents() {
      try {
        const studentsData = await AsyncStorage.getItem('students');
        if (studentsData) {
          dispatch(loadStudents(JSON.parse(studentsData)));
        }
      } catch (error) {
        console.error('Error loading students:', error);
      }
    }

    loadStoredStudents();
  }, []);

  const handleAddStudent = () => {
    // const newStudent = { name: 'Eve4', age: 19, grade: 'B+' };
    // dispatch(addStudent(newStudent));
  };

  const handleDeleteStudent = rowId => {
    dispatch(deleteStudent(rowId));
  };
  const renderItem = ({ item }) => (
    <View style={styles.formRow}>
       <Text style={styles.grid_label}>{item?.rowId}</Text>
      <Text style={styles.grid_label}>{item?.tableNo}</Text>
      <Text style={styles.grid_label}>{item?.itemCode}</Text>
      <Text style={styles.grid_label}>{item?.qty}</Text>
      <Text style={styles.grid_label}>{item?.rate}</Text>
      <Text style={styles.grid_label}>{item?.itemName}</Text>
      <Button
        title="Delete"
        onPress={() => handleDeleteStudent(item?.rowId)}
      />
    </View>
  );
  return (
    // <View>
    //   <Text style={styles.heading}>Orders List</Text>
    //   <View style={styles.formRow}>
    //     <Text style={styles.grid_heading}>TableNo</Text>
    //     <Text style={styles.grid_heading}>ItemCode</Text>
    //     <Text style={styles.grid_heading}>QTY</Text>
    //     <Text style={styles.grid_heading}>Rate</Text>
    //     <Text style={styles.grid_heading}>ItemName</Text>
    //     <Text style={styles.grid_heading}>Action</Text>
    //   </View>      

    // {students?.map(student => (
    //     <ScrollView  key={student?.tableNo} contentContainerStyle={styles.formRow}>         
    //         <Text style={styles.grid_label}>{student?.tableNo}</Text>
    //         <Text style={styles.grid_label}> {student?.itemCode}</Text>
    //         <Text style={styles.grid_label}>{student?.qty}</Text>                 
    //         <Text style={styles.grid_label}> {student?.rate}</Text>
    //         <Text style={styles.grid_label}> {student?.itemName}</Text>
    //         <Button
    //         title="Delete"
    //         onPress={() => handleDeleteStudent(student?.tableNo)}
    //       />          
    //     </ScrollView>
    //   ))}
    // </View>

    <ScrollView contentContainerStyle={styles.container}>
      <View>
      <Text style={styles.heading}>Orders List</Text>
      </View>
      <View style={styles.formRow}>
      <Text style={styles.grid_heading}>RowID</Text>
        <Text style={styles.grid_heading}>TableNo</Text>
        <Text style={styles.grid_heading}>ItemCode</Text>
        <Text style={styles.grid_heading}>QTY</Text>
        <Text style={styles.grid_heading}>Rate</Text>
        <Text style={styles.grid_heading}>ItemName</Text>
        <Text style={styles.grid_heading}>Action</Text>
      </View>
      <FlatList
      LisHeaderComponent={
        <View style={{ flex: 1 }}>
          <Text>Header content</Text>
        </View>
      }
        data={students}
        renderItem={renderItem}
        keyExtractor={(item) => item.rowId.toString()}
        ListFooterComponent={
          <View style={{ flex: 1 }}>
            {/* <Text>Footer content</Text> */}
          </View>
        }
      />
    </ScrollView>
  );
}

export default OrderList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
   //maxHeight:200,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  grid_heading: {
    fontWeight: 'bold',
  },
  grid_label: {
    flex: 1,
  },
});

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-between'
//     },
//     formRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     grid_label: {
//         flex: 1,
//         fontSize: 10,
//         color:'#04070b'
//     },
//     grid_heading: {
//       flex: 1,
//       fontSize: 10,
//       fontWeight:'bold',
//       color:'#888f94'
//     },
//     heading: {
//         flex: 1,
//         fontSize: 20,
//         color: '#0c3761',
//         fontWeight: 500,
//         marginLeft:80,
//         marginBottom:16,
//         marginTop:16,
//     },
// });