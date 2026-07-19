export interface Device {
  id: string;
  name: string;
  type: 'computer' | 'printer' | 'scanner' | 'router' | 'other';
  serialNumber: string;
  location: string;
  status: 'active' | 'broken' | 'maintenance' | 'retired';
  purchaseDate: string;
  purchasePrice: number;
  description?: string;
  qrCode?: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceRecord {
  id: string;
  deviceId: string;
  date: string;
  type: 'repair' | 'cleaning' | 'inspection' | 'upgrade';
  description: string;
  technician: string;
  cost?: number;
}

export interface Statistics {
  totalDevices: number;
  activeDevices: number;
  brokenDevices: number;
  maintenanceDevices: number;
  retiredDevices: number;
}
