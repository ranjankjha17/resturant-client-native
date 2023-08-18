import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  students: [],  
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      // const newOrder=action.payload
      // const rate=parseInt(newOrder.rate)
      // const qty=parseInt(newOrder.qty)
      // state.totalAmount+=rate
      state.students.push(action.payload);
      AsyncStorage.setItem('students', JSON.stringify(state.students));
    },
    deleteStudent: (state, action) => {
      // const newOrder=action.payload
      // const rate=parseInt(newOrder.rate)
      // const qty=parseInt(newOrder.qty)
      // state.totalAmount-=rate
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
