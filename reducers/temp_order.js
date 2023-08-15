// studentSlice.js
import { createSlice } from '@reduxjs/toolkit';
//import AsyncStorage from '@react-native-community/async-storage';
//import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initialState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
      AsyncStorage.setItem('students', JSON.stringify(state.students));
    },
    deleteStudent: (state, action) => {
      state.students = state.students.filter(student => student.rowId !== action.payload);
      AsyncStorage.setItem('students', JSON.stringify(state.students));
    },
    loadStudents: (state, action) => {
      state.students = action.payload;
    },
    resetStudents: state => {
      state.students = [];
    },
  },
});

export const { addStudent, deleteStudent, loadStudents,resetStudents } = studentSlice.actions;

export default studentSlice.reducer;
