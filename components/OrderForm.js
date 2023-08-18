import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../reducers/order';
import Logo from './Logo';
import { addStudent, resetStudents } from '../reducers/temp_order';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';
import uuid from 'react-native-uuid';

const OrderForm = () => {
    const firstInputRef = useRef(null);
    const secondInputRef = useRef(null);
    let data;
    const orders = useSelector(state => state.orders)
    const students = useSelector(state => state.tempOrder.students);
    const user_ID = useSelector(state => state.auth.userID)
   //const userID="bhanu"
    console.log('user_ID', user_ID)
   // const totalAmount = useSelector(state => state.tempOrder.totalAmount)
    //console.log('totalAmount', totalAmount)

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
    console.log('found userid', userID)
    const uuidValue = uuid.v4();
    const rowId = parseInt(uuidValue.substring(0, 4), 16);

    console.log('id', rowId)
    //console.log(tableNo)
    let amount = parseInt(rate) * parseInt(qty)
    let bookingDate=new Date(date)
    console.log('con_date',bookingDate)
    // console.log(orders)
    const dispatch = useDispatch()
    useEffect(() => {
        firstInputRef.current.focus();
        dispatch(fetchOrders())
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
            //return;
        }
        else {
            data = {
                rowId, tableNo, itemCode, rate, qty, itemName, bookingDate, userID, currentTableType,amount
            }
            dispatch(addStudent(data));
            setItemCode('')
            setDeptNo('')
            setItemName('')
            setQty('')
            setRate('')
            secondInputRef.current.focus();
        }
    };

    const handleSaveData = async () => {
        try {
            const response = await axios.post(
                'https://resturant-server-mssql.vercel.app/api/order', students
            );

            dispatch(resetStudents());
            AsyncStorage.removeItem('students');
            alert("Your order is submitted")
            setTableNo('')
            setCurrentTableType('')
            firstInputRef.current.focus();
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    }

    const fetchDate = async () => {
        const timeoutDuration = 10000;
        try {
            let response = await fetch('https://resturant-server-mssql.vercel.app/api/date', { timeout: timeoutDuration })
            let result = await response.json()
            // console.log(result[0].TDate)
            const dateString = result[0].TDate
            
            const date = new Date(dateString)
            const day = date.getUTCDate()
            const month = date.getUTCMonth() + 1
            const year = date.getUTCFullYear()
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;
            const formattedDateStr = `${formattedDay}-${formattedMonth}-${year}`;
            console.log(formattedDateStr)
            setDate(formattedDateStr)
        } catch (error) {
            console.error('Network request failed:', error);

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
        let response = await fetch('https://resturant-server-mssql.vercel.app/api/table')
        let tables = await response.json()
        console.log(tables)    
        const foundTable=tables.find(item=>item.TableNo===parseInt(tableNo))
        if(foundTable){
            const tableType=foundTable.TypeT
            console.log("found table type",tableType) 
            setCurrentTableType(tableType)
        }
    }

    const getUserID = async () => {
        try {
            let response = await fetch('https://resturant-server-mssql.vercel.app/api/user')
            let result = await response.json()
            console.log('userid', result)
            const foundUserID = result.filter((e) => e.UserID === user_ID)
            if (foundUserID) {
                // setUserID(foundUserID[0]?.UserID)
                setUserID('bhanu')
            }

        } catch (error) {
            console.error('Error in fetching UserID:', error);
        }
    }

    return (
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
                    <Button title="ADD" color='#003c75' onPress={handleSubmit} />
                </View>
                <View style={styles.button_area}>
                    <Button title="Kot" color='#003c75' onPress={handleSaveData} />
                </View>
                <View style={styles.button_area}>
                    <Button title="Print" color='#003c75' />
                </View>
            </View>
        </ScrollView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        //marginLeft:48,
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
        //marginLeft: 16,
    },
    tableType: {
        flex: 1,
        fontSize: 16,
        color: 'red',
        fontWeight: 500,
        // marginTop: 88,
    }


});

export default OrderForm