import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useDeviceStore } from '../store/useDeviceStore';

const DeviceDetailScreen = ({ route, navigation }: any) => {
  const { deviceId } = route.params;
  const device = useDeviceStore((state) => state.getDeviceById(deviceId));
  const deleteDevice = useDeviceStore((state) => state.deleteDevice);

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>الجهاز غير موجود</Text>
      </View>
    );
  }

  const handleDelete = () => {
    deleteDevice(device.id);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.name}>
            {device.name}
          </Text>
          <Text variant="bodySmall">
            الرقم المسلسل: {device.serialNumber}
          </Text>
          <Text variant="bodySmall">
            الموقع: {device.location}
          </Text>
          <Text variant="bodySmall">
            الحالة: {device.status}
          </Text>
          <Text variant="bodySmall">
            السعر: {device.purchasePrice} ريال
          </Text>
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={handleDelete}
        style={styles.deleteButton}
      >
        حذف الجهاز
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
  card: {
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  deleteButton: {
    marginTop: 24,
  },
});

export default DeviceDetailScreen;
