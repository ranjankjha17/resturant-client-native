import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addStudent, deleteStudent, loadStudents } from '../reducers/temp_order';
import AsyncStorage from '@react-native-async-storage/async-storage';

function OrderList({ data }) {
  const students = useSelector(state => state.tempOrder.students);
 // console.log('students',students)
  const dispatch = useDispatch();
  async function loadStoredStudents() {
    try {
      const studentsData = await AsyncStorage.getItem('students');
      if (studentsData) {
        dispatch(loadStudents(JSON.parse(studentsData)));
      }
    } catch (error) {
      console.log( error.message);
    }
  }
  useEffect(() => {   
    loadStoredStudents();
  }, []);
  const handleDeleteStudent = rowId => {
    dispatch(deleteStudent(rowId));
  };
 
  return (
    <View style={styles.container2}>
      <Text style={styles.heading}>Orders List</Text>
      <View style={styles.formRow}>
        <Text style={styles.grid_heading}>RowID</Text>
        <Text style={styles.grid_heading}>TableNo</Text>
        <Text style={styles.grid_heading}>ItemCode</Text>
        <Text style={styles.grid_heading}>QTY</Text>
        <Text style={styles.grid_heading}>ItemName</Text>
        <Text style={styles.grid_heading}>Rate</Text>
        <Text style={styles.grid_heading}>Action</Text>
      </View>
      <ScrollView style={styles.container}>
      {students?.map(student => (
        <ScrollView key={student?.rowId} contentContainerStyle={styles.formRow}>
          <Text style={styles.grid_label}>{student?.rowId}</Text>
          <Text style={styles.grid_label}>{student?.tableNo}</Text>
          <Text style={styles.grid_label}> {student?.itemCode}</Text>
          <Text style={styles.grid_label}>{student?.qty}</Text>
          <Text style={styles.grid_label}> {student?.itemName}</Text>
          <Text style={styles.grid_label}> {student?.rate}</Text>
          {/* <Button
            title="Delete"
            onPress={() => handleDeleteStudent(student?.rowId)}
          /> */}
          <View style={styles.button_area}>
          <Text style={styles.button_delete} onPress={() => handleDeleteStudent(student?.rowId)}>Delete</Text>
          </View>
        </ScrollView>
      ))}
    </ScrollView>
</View> 
  );
}

export default OrderList;

const styles = StyleSheet.create({
  container: {
  // flex:1,
   //height:300,
  
   //padding: 10,
  },
  container2: { 
    padding: 10,
    // flex:1
   },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    marginBottom: 8,  
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
  heading: {
    flex: 1,
    fontSize: 20,
    color: '#0c3761',
    fontWeight: 500,
    marginLeft: 80,
    marginBottom: 16,
    marginTop: 16,
  },
  button_delete:{
    flex: 1,
    fontSize: 12,
    color: '#0c3761',
    fontWeight: 500,
  },
  button_area:{
    backgroundColor:'#eeffff',
    padding:5
  }
});