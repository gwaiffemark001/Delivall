import { StyleSheet, Text, View } from 'react-native';
import { Delivery } from '@/types';
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';

interface DeliveryCardProps {
  delivery: Delivery;
  onPress?: () => void;
}

export default function DeliveryCard({ delivery, onPress }: DeliveryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.trackingNumber}>{delivery.trackingNumber}</Text>
        <StatusBadge status={delivery.status} />
      </View>
      
      <View style={styles.route}>
        <View style={styles.location}>
          <View style={styles.dot} />
          <Text style={styles.locationText}>{delivery.origin.city}, {delivery.origin.state}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.location}>
          <View style={[styles.dot, styles.destinationDot]} />
          <Text style={styles.locationText}>{delivery.destination.city}, {delivery.destination.state}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <View>
          <Text style={styles.label}>Estimated Delivery</Text>
          <Text style={styles.date}>
            {format(new Date(delivery.estimatedDelivery), 'MMM dd, yyyy')}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Customer</Text>
          <Text style={styles.customer}>{delivery.customer.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
  },
  route: {
    marginBottom: 16,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
    marginRight: 8,
  },
  destinationDot: {
    backgroundColor: '#4CAF50',
  },
  line: {
    width: 2,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginLeft: 5,
    marginVertical: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  label: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  customer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
});
