import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import DeliveryCard from '@/components/DeliveryCard';
import DeliveryStatusFilter, {
  DeliveryStatusFilterValue,
} from '@/components/DeliveryStatusFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import {
  filterDeliveriesByStatus,
  getAllDeliveries,
  getDeliveryByTrackingNumber,
} from '@/data/mockData';
import { Delivery } from '@/types';

export default function Index() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [deliveries, setDeliveries] = useState<Delivery[]>(getAllDeliveries());
  const [selectedStatus, setSelectedStatus] =
    useState<DeliveryStatusFilterValue>('all');
  const [isLoading, setIsLoading] = useState(false);
  const visibleDeliveries = filterDeliveriesByStatus(deliveries, selectedStatus);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setDeliveries(getAllDeliveries());
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const delivery = getDeliveryByTrackingNumber(searchQuery.trim());
      setDeliveries(delivery ? [delivery] : []);
      setIsLoading(false);
    }, 500);
  };

  const handleCardPress = (trackingNumber: string) => {
    router.push(`/${trackingNumber}`);
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>
        {deliveries.length === 0
          ? 'No delivery found'
          : `No ${selectedStatus.replace(/_/g, ' ')} deliveries`}
      </Text>
      <Text style={styles.emptySubtitle}>
        {deliveries.length === 0
          ? (searchQuery ? 'Check the tracking number and try again' : 'Add a new delivery to get started')
          : 'Select All to see deliveries in every status'}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter tracking number..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <DeliveryStatusFilter
        deliveries={deliveries}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={visibleDeliveries}
          renderItem={({ item }) => (
            <DeliveryCard 
              delivery={item} 
              onPress={() => handleCardPress(item.trackingNumber)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  listContent: {
    paddingVertical: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});
