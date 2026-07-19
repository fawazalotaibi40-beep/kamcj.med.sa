import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { useDeviceStore } from '../store/useDeviceStore';
import QRCodeGenerator from '../components/QRCodeGenerator';

const DeviceDetailScreen = ({ route, navigation }: any) => {
  const { deviceId } = route.params;
  const device = useDeviceStore((state) => state.getDeviceById(deviceId));
  const updateDevice = useDeviceStore((state) => state.updateDevice);
  const deleteDevice = useDeviceStore((state) => state.deleteDevice);
  const maintenanceRecords = useDeviceStore((state) =>
    state.getDeviceMaintenanceRecords(deviceId)
  );
  const [showQRCode, setShowQRCode] = useState(false);

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>الجهاز غير موجود</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'تأكيد الحذف',
      'هل تريد حذف هذا الجهاز؟',
      [
        {
          text: 'إلغاء',
          onPress: () => {},
        },
        {
          text: 'حذف',
          onPress: () => {
            deleteDevice(device.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const qrCodeData = JSON.stringify({
    id: device.id,
    name: device.name,
    serialNumber: device.serialNumber,
    type: device.type,
    location: device.location,
  });

  const handleStatusChange = (newStatus: string) => {
    updateDevice(device.id, {
      status: newStatus as any,
      updatedAt: new Date().toISOString(),
    });
    Alert.alert('تم', `تم تحديث حالة الجهاز إلى: ${newStatus}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.name}>
            {device.name}
          </Text>
          <Text variant="bodySmall" style={styles.serialNumber}>
            الرقم المسلسل: {device.serialNumber}
          </Text>
          <Divider style={styles.divider} />

          <View style={styles.detailRow}>
            <Text variant="titleSmall">النوع:</Text>
            <Text variant="bodySmall">{device.type}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleSmall">الموقع:</Text>
            <Text variant="bodySmall">{device.location}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleSmall">الحالة:</Text>
            <Text variant="bodySmall" style={styles.statusBadge}>
              {device.status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleSmall">تاريخ الشراء:</Text>
            <Text variant="bodySmall">{device.purchaseDate}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text variant="titleSmall">سعر الشراء:</Text>
            <Text variant="bodySmall">{device.purchasePrice} ريال</Text>
          </View>

          {device.description && (
            <>
              <Divider style={styles.divider} />
              <Text variant="titleSmall" style={styles.label}>
                الملاحظات:
              </Text>
              <Text variant="bodySmall">{device.description}</Text>
            </>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            رمز QR 🔲
          </Text>
          <Text variant="bodySmall" style={styles.qrDescription}>
            يمكن مسح هذا الرمز ضوئياً للحصول على معلومات الجهاز بسرعة
          </Text>
          {showQRCode && (
            <View style={styles.qrCodeContainer}>
              <QRCodeGenerator value={qrCodeData} size={200} />
            </View>
          )}
          <Button
            mode={showQRCode ? 'outlined' : 'contained'}
            onPress={() => setShowQRCode(!showQRCode)}
            style={styles.button}
          >
            {showQRCode ? 'إخفاء رمز QR' : 'عرض رمز QR'}
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            تغيير الحالة
          </Text>
          <View style={styles.statusButtonsContainer}>
            <Button
              mode={device.status === 'active' ? 'contained' : 'outlined'}
              onPress={() => handleStatusChange('active')}
              style={[styles.statusButton, styles.activeButton]}
            >
              نشط
            </Button>
            <Button
              mode={device.status === 'maintenance' ? 'contained' : 'outlined'}
              onPress={() => handleStatusChange('maintenance')}
              style={[styles.statusButton, styles.maintenanceButton]}
            >
              صيانة
            </Button>
          </View>
          <View style={styles.statusButtonsContainer}>
            <Button
              mode={device.status === 'broken' ? 'contained' : 'outlined'}
              onPress={() => handleStatusChange('broken')}
              style={[styles.statusButton, styles.brokenButton]}
            >
              معطل
            </Button>
            <Button
              mode={device.status === 'retired' ? 'contained' : 'outlined'}
              onPress={() => handleStatusChange('retired')}
              style={[styles.statusButton, styles.retiredButton]}
            >
              مستبعد
            </Button>
          </View>
        </Card.Content>
      </Card>

      {maintenanceRecords.length > 0 && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              سجل الصيانة
            </Text>
            {maintenanceRecords.map((record) => (
              <View key={record.id} style={styles.maintenanceItem}>
                <Text variant="bodySmall" style={styles.maintenanceDate}>
                  {record.date} - {record.type}
                </Text>
                <Text variant="bodySmall" style={styles.maintenanceDescription}>
                  {record.description}
                </Text>
                {record.technician && (
                  <Text variant="bodySmall" style={styles.technician}>
                    الفني: {record.technician}
                  </Text>
                )}
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      <View style={styles.deleteButtonContainer}>
        <Button
          mode="outlined"
          onPress={() => handleDelete()}
          style={styles.deleteButton}
        >
          حذف الجهاز
        </Button>
      </View>
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
    marginBottom: 8,
  },
  serialNumber: {
    color: '#666',
  },
  divider: {
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  qrDescription: {
    color: '#666',
    marginBottom: 12,
  },
  qrCodeContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
  statusButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  activeButton: {
    borderColor: '#4caf50',
  },
  maintenanceButton: {
    borderColor: '#ff9800',
  },
  brokenButton: {
    borderColor: '#f44336',
  },
  retiredButton: {
    borderColor: '#9e9e9e',
  },
  maintenanceItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  maintenanceDate: {
    fontWeight: '500',
    marginBottom: 4,
  },
  maintenanceDescription: {
    color: '#666',
    marginBottom: 4,
  },
  technician: {
    color: '#999',
    fontSize: 12,
  },
  deleteButtonContainer: {
    marginVertical: 24,
  },
  deleteButton: {
    borderColor: '#d32f2f',
  },
});

export default DeviceDetailScreen;
