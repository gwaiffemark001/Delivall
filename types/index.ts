export interface Delivery {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';
  origin: Location;
  destination: Location;
  currentLocation: Location | null;
  estimatedDelivery: string;
  actualDelivery?: string;
  customer: Customer;
  updates: DeliveryUpdate[];
}

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface DeliveryUpdate {
  timestamp: string;
  status: string;
  location: string;
  message: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
}
