import { useState } from 'react';
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLocation = async () => {
    setLoading(true);
    setError(null);

    // 1. Ask for permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Location permission denied');
      setLoading(false);
      return;
    }

    // 2. Read the GPS
    const loc = await Location.getCurrentPositionAsync({});
    setCoords(loc.coords);
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Where am I?</Text>

      {coords && (
        <View style={styles.card}>
          <Text style={styles.label}>Latitude</Text>
          <Text style={styles.value}>{coords.latitude.toFixed(5)}</Text>
          <Text style={styles.label}>Longitude</Text>
          <Text style={styles.value}>{coords.longitude.toFixed(5)}</Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={getLocation} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#0F172A" />
        ) : (
          <Text style={styles.buttonText}>Get my location</Text>
        )}
      </Pressable>

      <Text style={styles.hint}>
        These coordinates feed straight into the Weather app in Session 3.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold', marginBottom: 32 },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    width: 240,
    alignItems: 'center',
    marginBottom: 32,
  },
  label: { color: '#94A3B8', fontSize: 14, marginTop: 8 },
  value: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', fontVariant: ['tabular-nums'] },
  button: {
    backgroundColor: '#22D3EE',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 36,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: { color: '#0F172A', fontSize: 18, fontWeight: 'bold' },
  error: { color: '#EF4444', fontSize: 15, marginBottom: 24 },
  hint: { color: '#475569', fontSize: 13, marginTop: 24, textAlign: 'center', paddingHorizontal: 20 },
});
