import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import StatusBadge from '@/components/StatusBadge';
import { getDeliveryByTrackingNumber } from '@/data/mockData';
import { Delivery, DeliveryUpdate } from '@/types';
import { format } from 'date-fns';

export default function TrackingDetails() {
  const { trackingNumber } = useLocalSearchParams<{ trackingNumber: string }>();
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundDelivery = getDeliveryByTrackingNumber(trackingNumber || '');
      setDelivery(foundDelivery || null);
      setIsLoading(false);
    }, 500);
  }, [trackingNumber]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading tracking details...</Text>
      </View>
    );
  }

  if (!delivery) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Delivery Not Found</Text>
        <Text style={styles.errorText}>
          No delivery found with tracking number: {trackingNumber}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Status Header */}
      <View style={styles.statusHeader}>
        <Text style={styles.trackingNumber}>{delivery.trackingNumber}</Text>
        <StatusBadge status={delivery.status} />
        <Text style={styles.statusText}>
          {delivery.status === 'delivered' 
            ? `Delivered on ${format(new Date(delivery.actualDelivery!), 'MMM dd, yyyy')}`
            : `Estimated: ${format(new Date(delivery.estimatedDelivery), 'MMM dd, yyyy')}`
          }
        </Text>
      </View>

      {/* Route Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Route</Text>
        <View style={styles.routeInfo}>
          <View style={styles.routePoint}>
            <View style={[styles.routeDot, styles.originDot]} />
            <View style={styles.routeDetails}>
              <Text style={styles.routeLabel}>Origin</Text>
              <Text style={styles.routeAddress}>{delivery.origin.address}</Text>
              <Text style={styles.routeCity}>{delivery.origin.city}, {delivery.origin.state} {delivery.origin.zipCode}</Text>
            </View>
          </View>
          
          <View style={styles.routeLine} />
          
          <View style={styles.routePoint}>
            <View style={[styles.routeDot, styles.destinationDot]} />
            <View style={styles.routeDetails}>
              <Text style={styles.routeLabel}>Destination</Text>
              <Text style={styles.routeAddress}>{delivery.destination.address}</Text>
              <Text style={styles.routeCity}>{delivery.destination.city}, {delivery.destination.state} {delivery.destination.zipCode}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Current Location */}
      {delivery.currentLocation && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Location</Text>
          <View style={styles.currentLocation}>
            <Text style={styles.locationAddress}>{delivery.currentLocation.address}</Text>
            <Text style={styles.locationCity}>{delivery.currentLocation.city}, {delivery.currentLocation.state}</Text>
          </View>
        </View>
      )}

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer</Text>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>{delivery.customer.name}</Text>
          <Text style={styles.customerContact}>{delivery.customer.phone}</Text>
          <Text style={styles.customerContact}>{delivery.customer.email}</Text>
        </View>
      </View>

      {/* Tracking History */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tracking History</Text>
        <View style={styles.timeline}>
          {delivery.updates.map((update, index) => (
            <View key={index} style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              {index < delivery.updates.length - 1 && <View style={styles.timelineLine} />}
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>
                  {format(new Date(update.timestamp), 'MMM dd, yyyy HH:mm')}
                </Text>
                <Text style={styles.timelineStatus}>{update.status.replace('_', ' ').toUpperCase()}</Text>
                <Text style={styles.timelineMessage}>{update.message}</Text>
                <Text style={styles.timelineLocation}>{update.location}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F44336',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  statusHeader: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  trackingNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 16,
  },
  routeInfo: {
    paddingLeft: 8,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
    marginTop: 4,
  },
  originDot: {
    backgroundColor: '#2196F3',
  },
  destinationDot: {
    backgroundColor: '#4CAF50',
  },
  routeDetails: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#999999',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  routeAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  routeCity: {
    fontSize: 14,
    color: '#666666',
  },
  routeLine: {
    width: 2,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginLeft: 7,
    marginVertical: 8,
  },
  currentLocation: {
    paddingLeft: 8,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  locationCity: {
    fontSize: 14,
    color: '#666666',
  },
  customerInfo: {
    paddingLeft: 8,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  customerContact: {
    fontSize: 14,
    color: '#666666',
  },
  timeline: {
    paddingLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
    marginRight: 12,
    marginTop: 6,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 24,
    width: 2,
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTime: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  timelineStatus: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2196F3',
    marginBottom: 4,
  },
  timelineMessage: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  timelineLocation: {
    fontSize: 14,
    color: '#666666',
  },
});
