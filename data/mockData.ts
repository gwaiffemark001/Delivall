import { Delivery } from '@/types';

export const mockDeliveries: Delivery[] = [
  {
    id: '1',
    trackingNumber: 'TRK1234567890',
    status: 'in_transit',
    origin: {
      address: '123 Warehouse St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      coordinates: { latitude: 34.0522, longitude: -118.2437 },
    },
    destination: {
      address: '456 Customer Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      coordinates: { latitude: 37.7749, longitude: -122.4194 },
    },
    currentLocation: {
      address: '789 Highway 101',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95110',
      coordinates: { latitude: 37.3382, longitude: -121.8863 },
    },
    estimatedDelivery: '2024-01-15T18:00:00Z',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1-555-0123',
    },
    updates: [
      {
        timestamp: '2024-01-14T08:00:00Z',
        status: 'pending',
        location: 'Los Angeles, CA',
        message: 'Package received at warehouse',
      },
      {
        timestamp: '2024-01-14T10:30:00Z',
        status: 'in_transit',
        location: 'Los Angeles, CA',
        message: 'Package departed from facility',
      },
      {
        timestamp: '2024-01-14T15:45:00Z',
        status: 'in_transit',
        location: 'San Jose, CA',
        message: 'Package in transit to destination',
      },
    ],
  },
  {
    id: '2',
    trackingNumber: 'TRK0987654321',
    status: 'out_for_delivery',
    origin: {
      address: '321 Distribution Center',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      coordinates: { latitude: 47.6062, longitude: -122.3321 },
    },
    destination: {
      address: '654 Home Lane',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      coordinates: { latitude: 45.5152, longitude: -122.6784 },
    },
    currentLocation: {
      address: '987 Delivery Route',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      coordinates: { latitude: 45.5231, longitude: -122.6765 },
    },
    estimatedDelivery: '2024-01-14T20:00:00Z',
    customer: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1-555-0456',
    },
    updates: [
      {
        timestamp: '2024-01-13T09:00:00Z',
        status: 'pending',
        location: 'Seattle, WA',
        message: 'Package received at warehouse',
      },
      {
        timestamp: '2024-01-13T14:00:00Z',
        status: 'in_transit',
        location: 'Seattle, WA',
        message: 'Package departed from facility',
      },
      {
        timestamp: '2024-01-14T08:00:00Z',
        status: 'out_for_delivery',
        location: 'Portland, OR',
        message: 'Out for delivery',
      },
    ],
  },
  {
    id: '3',
    trackingNumber: 'TRK1122334455',
    status: 'delivered',
    origin: {
      address: '555 Commerce Blvd',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      coordinates: { latitude: 40.7128, longitude: -74.0060 },
    },
    destination: {
      address: '777 Residential Dr',
      city: 'Boston',
      state: 'MA',
      zipCode: '02101',
      coordinates: { latitude: 42.3601, longitude: -71.0589 },
    },
    currentLocation: null,
    estimatedDelivery: '2024-01-12T18:00:00Z',
    actualDelivery: '2024-01-12T16:30:00Z',
    customer: {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1-555-0789',
    },
    updates: [
      {
        timestamp: '2024-01-11T07:00:00Z',
        status: 'pending',
        location: 'New York, NY',
        message: 'Package received at warehouse',
      },
      {
        timestamp: '2024-01-11T11:00:00Z',
        status: 'in_transit',
        location: 'New York, NY',
        message: 'Package departed from facility',
      },
      {
        timestamp: '2024-01-12T09:00:00Z',
        status: 'out_for_delivery',
        location: 'Boston, MA',
        message: 'Out for delivery',
      },
      {
        timestamp: '2024-01-12T16:30:00Z',
        status: 'delivered',
        location: 'Boston, MA',
        message: 'Package delivered successfully',
      },
    ],
  },
];

export const getDeliveryByTrackingNumber = (trackingNumber: string): Delivery | undefined => {
  return mockDeliveries.find(d => d.trackingNumber === trackingNumber);
};

export const getAllDeliveries = (): Delivery[] => {
  return mockDeliveries;
};
