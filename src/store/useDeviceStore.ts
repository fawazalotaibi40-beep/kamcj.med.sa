import { create } from 'zustand';
import { Device, MaintenanceRecord } from '../types';

interface DeviceStore {
  devices: Device[];
  maintenanceRecords: MaintenanceRecord[];
  addDevice: (device: Device) => void;
  updateDevice: (id: string, device: Partial<Device>) => void;
  deleteDevice: (id: string) => void;
  getDeviceById: (id: string) => Device | undefined;
  addMaintenanceRecord: (record: MaintenanceRecord) => void;
  getDeviceMaintenanceRecords: (deviceId: string) => MaintenanceRecord[];
}

export const useDeviceStore = create<DeviceStore>((set, get) => ({
  devices: [],
  maintenanceRecords: [],

  addDevice: (device: Device) =>
    set((state) => ({
      devices: [...state.devices, device],
    })),

  updateDevice: (id: string, updates: Partial<Device>) =>
    set((state) => ({
      devices: state.devices.map((device) =>
        device.id === id ? { ...device, ...updates } : device
      ),
    })),

  deleteDevice: (id: string) =>
    set((state) => ({
      devices: state.devices.filter((device) => device.id !== id),
    })),

  getDeviceById: (id: string) => {
    return get().devices.find((device) => device.id === id);
  },

  addMaintenanceRecord: (record: MaintenanceRecord) =>
    set((state) => ({
      maintenanceRecords: [...state.maintenanceRecords, record],
    })),

  getDeviceMaintenanceRecords: (deviceId: string) => {
    return get().maintenanceRecords.filter((record) => record.deviceId === deviceId);
  },
}));
