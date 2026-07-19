import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useDeviceStore } from '../store/useDeviceStore';
import { Device } from '../types';

const AddDeviceScreen = ({ navigation }: any) => {
  const addDevice = useDeviceStore((state) => state.addDevice);
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [location, setLocation] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  const handleAddDevice = () => {
    if (!name || !serialNumber || !location) {
      alert('الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    const newDevice: Device = {
      id: Math.random().toString(),
      name,
      type: 'computer',
      serialNumber,
      location,
      status: 'active',
      purchaseDate: new Date().toISOString().split('T')[0],
      purchasePrice: parseFloat(purchasePrice) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addDevice(newDevice);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        إضافة جهاز جديد
      </Text>

      <TextInput
        label="اسم الجهاز"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        label="رقم المسلسل"
        value={serialNumber}
        onChangeText={setSerialNumber}
        style={styles.input}
      />

      <TextInput
        label="الموقع"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <TextInput
        label="سعر الشراء"
        value={purchasePrice}
        onChangeText={setPurchasePrice}
        style={styles.input}
        keyboardType="decimal-pad"
      />

      <Button
        mode="contained"
        onPress={handleAddDevice}
        style={styles.button}
      >
        حفظ الجهاز
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 24,
  },
});

export default AddDeviceScreen;
