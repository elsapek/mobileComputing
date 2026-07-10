import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const { width } = Dimensions.get('window');
const FIELD = width - 48;   // size of the square play area
const DOT = 40;

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(80); // ms  (~12 readings/sec)
    const sub = Accelerometer.addListener(setData);
    return () => sub.remove(); // cleanup when the screen closes
  }, []);

  // Map tilt (-1..1) to a position inside the field
  const half = (FIELD - DOT) / 2;
  const dotLeft = half + x * -half;
  const dotTop = half + y * half;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Tilt Meter</Text>

      <View style={styles.field}>
        <View style={[styles.dot, { left: dotLeft, top: dotTop }]} />
      </View>

      <Text style={styles.reading}>
        x: {x.toFixed(2)}   y: {y.toFixed(2)}   z: {z.toFixed(2)}
      </Text>
      <Text style={styles.hint}>Tilt your phone — the dot rolls with gravity</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  field: {
    width: FIELD,
    height: FIELD,
    borderRadius: 16,
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    borderWidth: 1,
  },
  dot: {
    position: 'absolute',
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: '#22D3EE',
  },
  reading: { color: '#FFFFFF', fontSize: 18, marginTop: 24, fontVariant: ['tabular-nums'] },
  hint: { color: '#475569', fontSize: 13, marginTop: 8 },
});
