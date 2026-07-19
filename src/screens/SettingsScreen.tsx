import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { List, Text } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        الإعدادات
      </Text>

      <List.Section title="البيانات">
        <List.Item
          title="تصدير البيانات"
          description="تحميل نسخة من جميع البيانات"
          left={(props) => <List.Icon {...props} icon="download" />}
        />
        <List.Item
          title="حذف جميع البيانات"
          description="حذف جميع الأجهزة والسجلات"
          left={(props) => <List.Icon {...props} icon="trash-can" />}
        />
      </List.Section>

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.footerText}>
          برنامج جرد الأجهزة v1.0.0
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontWeight: 'bold',
    padding: 16,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#999',
  },
});

export default SettingsScreen;
