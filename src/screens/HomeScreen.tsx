import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList, Alert } from 'react-native';
import { FAB, Searchbar, Chip, Card, Text, Button } from 'react-native-paper';
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { backgroundColor: '#e8f5e9', color: '#2e7d32' };
      case 'broken':
        return { backgroundColor: '#ffebee', color: '#c62828' };
      case 'maintenance':
        return { backgroundColor: '#fff3e0', color: '#e65100' };
      case 'retired':
        return { backgroundColor: '#f5f5f5', color: '#616161' };
      default:
        return { backgroundColor: '#f5f5f5', color: '#333' };
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢 نشط';
      case 'broken':
        return '🔴 معطل';
      case 'maintenance':
        return '🟡 صيانة';
      case 'retired':
        return '⚫ مستبعد';
      default:
        return status;
    }
  };

  const renderDeviceCard = ({ item }: { item: Device }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('DeviceDetail', { deviceId: item.id })}
    >
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text variant="titleMedium" style={styles.deviceName}>
            {item.name}
          </Text>
          <Chip
            label={getStatusLabel(item.status)}
            style={[styles.statusChip, getStatusColor(item.status)]}
          />
        </View>
        <Text variant="bodySmall" style={styles.serialNumber}>
          🏷️ {item.serialNumber}
        </Text>
        <Text variant="bodySmall" style={styles.type}>
          📱 {item.type}
        </Text>
        <Text variant="bodySmall" style={styles.location}>
          📍 {item.location}
        </Text>
        <Button
          mode="text"
          size="small"
          onPress={() => navigation.navigate('DeviceDetail', { deviceId: item.id })}
          style={styles.detailsButton}
        >
          عرض التفاصيل
        </Button>
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
      >
        <Chip
          label="الكل"
          selected={!filterStatus}
          onPress={() => setFilterStatus(null)}
          style={styles.filterChip}
        />
        <Chip
          label="🟢 نشط"
          selected={filterStatus === 'active'}
          onPress={() => setFilterStatus('active')}
          style={styles.filterChip}
        />
        <Chip
          label="🔴 معطل"
          selected={filterStatus === 'broken'}
          onPress={() => setFilterStatus('broken')}
          style={styles.filterChip}
        />
        <Chip
          label="🟡 صيانة"
          selected={filterStatus === 'maintenance'}
          onPress={() => setFilterStatus('maintenance')}
          style={styles.filterChip}
        />
        <Chip
          label="⚫ مستبعد"
          selected={filterStatus === 'retired'}
          onPress={() => setFilterStatus('retired')}
          style={styles.filterChip}
        />
      </ScrollView>
      <FlatList
        data={filteredDevices}
        renderItem={renderDeviceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="titleMedium" style={styles.emptyText}>
              لا توجد أجهزة
            </Text>
            <Text variant="bodySmall" style={styles.emptySubText}>
              اضغط على زر "+" لإضافة جهاز جديد
            </Text>
          </View>
        }
      />
      <FAB.Group
        open={false}
        icon="plus"
        actions={[
          {
            icon: 'plus',
            label: 'إضافة جهاز جديد',
            onPress: () => navigation.navigate('AddDevice'),
          },
        ]}
        onStateChange={({ open }) => {}}
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
    marginBottom: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
    maxHeight: 50,
  },
  filterChip: {
    marginRight: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deviceName: {
    fontWeight: 'bold',
    flex: 1,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  serialNumber: {
    color: '#666',
    marginBottom: 6,
  },
  type: {
    marginBottom: 6,
  },
  location: {
    marginBottom: 8,
    color: '#1976d2',
  },
  detailsButton: {
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginBottom: 8,
  },
  emptySubText: {
    color: '#999',
  },
});

export default HomeScreen;
