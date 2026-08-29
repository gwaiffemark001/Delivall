import { StyleSheet, Text, View } from 'react-native';

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <View style={styles.spinner} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    borderTopColor: '#2196F3',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
});
