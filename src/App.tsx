import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';

import HomeScreen from './screens/HomeScreen';
import AddDeviceScreen from './screens/AddDeviceScreen';
import DeviceDetailScreen from './screens/DeviceDetailScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: '#1f77f1',
      }}
    >
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ title: 'جرد الأجهزة' }}
      />
      <Stack.Screen
        name="DeviceDetail"
        component={DeviceDetailScreen}
        options={{ title: 'تفاصيل الجهاز' }}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDeviceScreen}
        options={{ title: 'إضافة جهاز جديد' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1f77f1',
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              title: 'الأجهزة',
              tabBarLabel: 'الأجهزة',
            }}
          />
          <Tab.Screen
            name="Statistics"
            component={StatisticsScreen}
            options={{
              title: 'الإحصائيات',
              tabBarLabel: 'الإحصائيات',
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              title: 'الإعدادات',
              tabBarLabel: 'الإعدادات',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
