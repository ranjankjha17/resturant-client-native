import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../reducers/order';
import RestaurantOrderGrid from './RestaurantOrderGrid';
import Logo from './Logo';
import StudentList from './OrderList';
import { addStudent, resetStudents } from '../reducers/temp_order';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderForm = () => {
    let data;
    const orders = useSelector(state => state.orders)
    const students = useSelector(state => state.tempOrder.students);

    // console.log(orders)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchOrders())
    }, [dispatch])

    const [itemCode, setItemCode] = useState('');
    const [rate, setRate] = useState('');
    const [itemName, setItemName] = useState('');
    const [deptNo, setDeptNo] = useState('')
    const [qty, setQty] = useState('')
    const [tableNo, setTableNo] = useState('')
    //console.log(tableNo)
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
            return;
        }
        else {
            data = {
                tableNo, itemCode, rate, qty, itemName
            }
            dispatch(addStudent(data));
            setItemCode('')
            setDeptNo('')
            setItemName('')
            setQty('')
            setRate('')
            setTableNo('')
            // console.log(data)
            // try {
            //     const response = await axios.post(
            //         'https://resturant-server-mssql.vercel.app/api/order', data
            //     );
            //     alert("Your order is submitted")

            //     //console.log('Form data sent:', response.data);
            //     setItemCode('')
            //     setDeptNo('')
            //     setItemName('')
            //     setQty('')
            //     setRate('')
            //     setTableNo('')

            //     // You can handle the response here as needed.
            // } catch (error) {
            //     console.error('Error sending form data:', error);
            // }

        }
    };

    const handleSaveData = async () => {
        try {
            const response = await axios.post(
                'http://localhost:5000/api/order', students
            );
           
            dispatch(resetStudents());
            AsyncStorage.removeItem('students');
            alert("Your order is submitted")

            //console.log('Form data sent:', response.data);


            // You can handle the response here as needed.
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Logo />
            <View style={styles.formRow}>
                <Text style={styles.label}>Table No</Text>
                <TextInput style={styles.input}
                    placeholder="Table No"
                    value={tableNo}
                    onChangeText={(value) => setTableNo(value)}
                />
            </View>
            <View style={styles.formRow}>
                <Text style={styles.label}>Item Code</Text>
                <TextInput style={styles.input}
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

            <StudentList />
            <RestaurantOrderGrid />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
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

});

export default OrderForm

//label color:#0c3761
//text box border color:#4c5156
//textbox background:#fffefe
//form background color:#eef4fc
//font color:#5b5f61
//button background :#003c75
//button font color:#d9e9f9
//heading color:#888f94
//heading label color:#04070b