import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Print from 'expo-print';

const PrintScreen = () => {
  const data = [
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
   
  ];


let array=  [
    {
        "rowId": 60833,
        "tableNo": "1",
        "itemCode": "1",
        "rate": "28",
        "qty": "1",
        "itemName": "idli",
        "bookingDate": "07-07-2023",
        "userID": "ranjan",
        "currentTableType": "NonAC",
        "amount": 28
    },
    {
        "rowId": 21720,
        "tableNo": "1",
        "itemCode": "2",
        "rate": "15",
        "qty": "2",
        "itemName": "S Idli",
        "bookingDate": "07-07-2023",
        "userID": "ranjan",
        "currentTableType": "NonAC",
        "amount": 30
    },
    {
        "rowId": 4773,
        "tableNo": "1",
        "itemCode": "3",
        "rate": "55",
        "qty": "2",
        "itemName": "Vada",
        "bookingDate": "07-07-2023",
        "userID": "ranjan",
        "currentTableType": "NonAC",
        "amount": 110
    },
    {
        "rowId": 58187,
        "tableNo": "1",
        "itemCode": "4",
        "rate": "30",
        "qty": "2",
        "itemName": "S Vada",
        "bookingDate": "07-07-2023",
        "userID": "ranjan",
        "currentTableType": "NonAC",
        "amount": 60
    }
]

  const generateHTMLContent = () => {
    const itemsHTML = data.map(item => `<li>${item.text}</li>`).join('');
    return `<html><body><ul>${itemsHTML}</ul></body></html>`;
  };

  const handlePrint = async () => {
    try {
      const content = generateHTMLContent();
      await Print.printAsync({ html: content });
    } catch (error) {
      console.error('Error printing:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Click the button to print</Text>
      <Button title="Print" onPress={handlePrint} />
    </View>
  );
};

export default PrintScreen;
