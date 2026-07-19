import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { FAB, Searchbar, Chip, Card, Text } from 'react-native-paper';
import { useDeviceStore } from '../store/useDeviceStore';
import { Device } from '../types';

const HomeScreen = ({ navigation }: any) => {
  const devices = useDeviceStore((state) => state.devices);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredDevices = devices.filter((device) => {
    const matchesSearch =
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterStatus || device.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderDeviceCard = ({ item }: { item: Device }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('DeviceDetail', { deviceId: item.id })}
    >
      <Card.Content>
        <Text variant="titleMedium" style={styles.deviceName}>
          {item.name}
        </Text>
        <Text variant="bodySmall" style={styles.serialNumber}>
          {item.serialNumber}
        </Text>
        <View style={styles.statusContainer}>
          <Chip label={item.status} />
        </View>
        <Text variant="bodySmall" style={styles.location}>
          {item.location}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="ابحث عن جهاز..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={filteredDevices}
        renderItem={renderDeviceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <FAB
        icon="plus"
        label="إضافة جهاز"
        onPress={() => navigation.navigate('AddDevice')}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
  },
  deviceName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serialNumber: {
    color: '#666',
    marginBottom: 8,
  },
  statusContainer: {
    marginVertical: 8,
  },
  location: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
