import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Delivery, DeliveryStatus } from '@/types';

export type DeliveryStatusFilterValue = DeliveryStatus | 'all';

interface DeliveryStatusFilterProps {
  deliveries: Delivery[];
  selectedStatus: DeliveryStatusFilterValue;
  onSelectStatus: (status: DeliveryStatusFilterValue) => void;
}

const statusOptions: { value: DeliveryStatusFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_transit', label: 'In Transit' },
  { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'failed', label: 'Failed' },
];

export default function DeliveryStatusFilter({
  deliveries,
  selectedStatus,
  onSelectStatus,
}: DeliveryStatusFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      accessibilityLabel="Filter deliveries by status"
    >
      {statusOptions.map(({ value, label }) => {
        const count = value === 'all'
          ? deliveries.length
          : deliveries.filter((delivery) => delivery.status === value).length;
        const isSelected = selectedStatus === value;

        return (
          <TouchableOpacity
            key={value}
            style={[styles.option, isSelected && styles.selectedOption]}
            onPress={() => onSelectStatus(value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`${label}, ${count} deliveries`}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {label}
            </Text>
            <Text style={[styles.count, isSelected && styles.selectedLabel]}>
              {count}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  option: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 12,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEE5',
  },
  selectedOption: {
    backgroundColor: '#174A63',
    borderColor: '#174A63',
  },
  label: {
    color: '#35424C',
    fontSize: 13,
    fontWeight: '600',
  },
  count: {
    color: '#667784',
    fontSize: 12,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
});