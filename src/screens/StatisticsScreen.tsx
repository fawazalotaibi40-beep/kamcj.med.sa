import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useDeviceStore } from '../store/useDeviceStore';

const StatisticsScreen = () => {
  const devices = useDeviceStore((state) => state.devices);

  const totalDevices = devices.length;
  const activeDevices = devices.filter((d) => d.status === 'active').length;
  const brokenDevices = devices.filter((d) => d.status === 'broken').length;
  const maintenanceDevices = devices.filter((d) => d.status === 'maintenance').length;

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        الإحصائيات
      </Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">إجمالي الأجهزة</Text>
          <Text variant="headlineMedium">{totalDevices}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">أجهزة نشطة</Text>
          <Text variant="headlineMedium">{activeDevices}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">أجهزة معطلة</Text>
          <Text variant="headlineMedium">{brokenDevices}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium">أجهزة تحت الصيانة</Text>
          <Text variant="headlineMedium">{maintenanceDevices}</Text>
        </Card.Content>
      </Card>
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
    fontWeight: 'bold',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
});

export default StatisticsScreen;
