import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../reducers/order';
import Logo from './Logo';
import { addStudent, resetStudents } from '../reducers/temp_order';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useMemo } from 'react';
import { createOrder, getDate, getTable } from '../services/orderService';

const OrderForm = () => {
    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);
    let data;
    const orders = useSelector(state => state.orders)
    const students = useSelector(state => state.tempOrder.students);
    const user_ID = useSelector(state => state.auth.userID)  
    const dispatch = useDispatch()
    const loginError = useSelector(state => state.auth.error)
   // let error=loginError
console.log('loginerror',loginError)
    const [userID, setUserID] = useState('')
    const [currentTableType, setCurrentTableType] = useState('')
    const [currentTime, setCurrentTime] = useState('')//pass argument new Date() for live interval
    const [date, setDate] = useState('')
    const [itemCode, setItemCode] = useState('');
    const [rate, setRate] = useState('');
    const [itemName, setItemName] = useState('');
    const [deptNo, setDeptNo] = useState('')
    const [qty, setQty] = useState('')
    const [tableNo, setTableNo] = useState('')
    const uuidValue = uuid.v4();
    const rowId = parseInt(uuidValue.substring(0, 4), 16);
    let amount = parseInt(rate) * parseInt(qty)
    let bookingDate = date
  
    useEffect(() => {
        firstInputRef.current.focus();
        dispatch(fetchItems())
        fetchDate()
        getUserID()
        getCurrentTime()
        fetchTable(tableNo)
        //     const interval = setInterval(() => {
        //         setCurrentTime(new Date());
        //       }, 1000); 

        //    return () => {
        //     clearInterval(interval); 
        //   };
    }, [dispatch, tableNo])

    const handleSearch = (text) => {
        setItemCode(text);
        const foundItem = orders.find((item) => item.pid === parseInt(text));
        if (foundItem) {
            setRate(foundItem.rate.toString());
            setItemName(foundItem.name.toString());
            setDeptNo(foundItem.dept.toString())
        } else {
            setRate('');
            setItemName('');
            setDeptNo('')
        }
    };
    const handleSubmit = async () => {
        if (
            tableNo === '' ||
            itemCode === '' ||
            rate === '' ||
            qty === '' ||
            deptNo === '' ||
            itemName === ''
        ) {
            alert('All fields are required');           
        }
        else {
            data = {
                rowId, tableNo, itemCode, rate, qty, itemName, bookingDate, userID, currentTableType, amount
            }
            dispatch(addStudent(data));
            setItemCode('')
            setDeptNo('')
            setItemName('')
            setQty('')
            setRate('')
            error=''
            secondInputRef.current.focus();
        }
    };

    const handleSaveData = async () => {    
        const response = await createOrder(students,dispatch)
        if (response) {
            dispatch(resetStudents());
            AsyncStorage.removeItem('students');
            alert("Your order is submitted")
            setTableNo('')
            setCurrentTableType('')
            firstInputRef.current.focus();
        }
    }

    const fetchDate = async () => {         
            const result=await getDate()
            if(result){         
            const dateString = result[0].TDate
            const date = new Date(dateString)
            const day = date.getUTCDate()
            const month = date.getUTCMonth() + 1
            const year = date.getUTCFullYear()
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;
            const formattedDateStr = `${formattedDay}-${formattedMonth}-${year}`;
            setDate(formattedDateStr)
            }       
    }

    const getCurrentTime = () => {
        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; const currentTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        setCurrentTime(currentTime)
    }

    const fetchTable = async (tableNo) => { 
        const tables=await getTable()
        const foundTable = tables.find(item => item.TableNo === parseInt(tableNo))
        if (foundTable) {
            const tableType = foundTable.TypeT
            setCurrentTableType(tableType)
        }
    }

    const getUserID = async () => {       
            const user = await AsyncStorage.getItem('loginUserID')
            setUserID(user_ID ? user_ID : user)      
    }

    const memoizedOrderForm = useMemo(() => (
        <ScrollView contentContainerStyle={styles.container}>
            {/* <Text style={styles.date}>UserID:{userID}</Text> */}
            <View style={styles.header}>
                <Text style={styles.date}>{date}</Text>
                <Logo style={styles.logo} />
                <View>
                    <Text style={styles.time}>{currentTime}</Text>
                    {/* currentTime.toLocaleTimeString() */}
                    <Text style={styles.tableType}>{currentTableType}</Text>
                </View>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>Table No</Text>
                <TextInput style={styles.input}
                    ref={firstInputRef}
                    placeholder="Table No"
                    value={tableNo}
                    onChangeText={(value) => setTableNo(value)}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>Item Code</Text>
                <TextInput style={styles.input}
                    ref={secondInputRef}
                    placeholder="Item Code"
                    value={itemCode}
                    onChangeText={handleSearch}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>QTY</Text>
                <TextInput style={styles.input}
                    placeholder="QTY"
                    value={qty}
                    onChangeText={(value) => setQty(value)}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>Rate</Text>
                <TextInput style={styles.input}
                    placeholder="Rate"
                    value={rate}
                    editable={false}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>Dept No</Text>
                <TextInput style={styles.input}
                    placeholder="Dept No"
                    value={deptNo}
                    editable={false}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>Item Name</Text>
                <TextInput style={styles.input}
                    placeholder="Item Name"
                    value={itemName}
                    editable={false}
                />
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.button_area}>
                    <Text style={styles.button} onPress={handleSubmit}>ADD</Text>
                </View>
                <View style={styles.button_area}>
                    <Text style={styles.button} onPress={handleSaveData}>KOT</Text>
                </View>
                <View style={styles.button_area}>
                    <Text style={styles.button}>PRINT</Text>
                </View>
            </View>
            {loginError && <Text style={styles.errorText}>{loginError}</Text>}
        </ScrollView>

    ), [tableNo, itemCode, qty, rate, deptNo, itemName,loginError,handleSearch, handleSubmit, handleSaveData]);

    return memoizedOrderForm;

};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        padding: 10,
        backgroundColor: '#eef4fc',
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        flex: 1,
        fontSize: 16,
        color: '#0c3761',
        fontWeight: 500
    },
    input: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#4c5156',
        padding: 8,
        marginLeft: 10,
        backgroundColor: '#fffefe',
        color: '#5b5f61',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button_area: {
        backgroundColor: '#003c75',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        color: "#d9e9f9",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    logo: {
        flex: 2,
    },
    date: {
        flex: 1,
        fontSize: 16,
        color: 'red',
        fontWeight: 500,
        marginTop: 88
    },
    time: {
        flex: 1,
        fontSize: 16,
        color: 'red',
        fontWeight: 500,
        marginTop: 88,
    },
    tableType: {
        flex: 1,
        fontSize: 16,
        color: 'red',
        fontWeight: 500,
    },
    button: {
        fontSize: 16,
        color: '#d9e9f9',
        fontWeight: 500,
        paddingTop: 3

    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        fontWeight: 500,
        paddingTop:10,
        
    },


});

export default OrderForm