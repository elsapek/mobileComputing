import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.box}>
      <Text style={styles.heading}>Hello!</Text>
      <Text style={styles.sub}>My first mobile app</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  heading: { fontSize: 32, fontWeight: 'bold', color: '#22D3EE' },
  sub: { fontSize: 16, color: '#94A3B8', marginTop: 8 },
});
