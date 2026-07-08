import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gyroscope } from 'expo-sensors';

// One row: an axis label, a bar that grows with the magnitude, and the value
function Axis({ label, value }) {
  const width = Math.min(Math.abs(value) / 6, 1) * 100; // rad/s -> 0..100%
  return (
    <View style={styles.row}>
      <Text style={styles.axis}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${width}%` }]} />
      </View>
      <Text style={styles.value}>{value.toFixed(2)}</Text>
    </View>
  );
}

export default function App() {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Gyroscope.setUpdateInterval(100);            // 10 readings per second
    const sub = Gyroscope.addListener(setData);
    return () => sub.remove();                   // stop when the screen closes
  }, []);

  const spinning = Math.abs(x) + Math.abs(y) + Math.abs(z) > 0.3;

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Gyroscope</Text>
      <Text style={styles.sub}>Rotation rate · rad/s</Text>

      <View style={styles.card}>
        <Axis label="X" value={x} />
        <Axis label="Y" value={y} />
        <Axis label="Z" value={z} />
      </View>

      <Text style={[styles.status, spinning && styles.spinning]}>
        {spinning ? 'spinning' : 'still'}
      </Text>
      <Text style={styles.hint}>Spin the phone around each axis and watch the bars.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold' },
  sub: { color: '#94A3B8', fontSize: 14, marginTop: 4, marginBottom: 28 },
  card: { width: 300 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  axis: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', width: 28 },
  track: { flex: 1, height: 12, backgroundColor: '#1E293B', borderRadius: 6, marginHorizontal: 12, overflow: 'hidden' },
  fill: { height: 12, backgroundColor: '#22D3EE', borderRadius: 6 },
  value: { color: '#94A3B8', fontSize: 15, width: 52, textAlign: 'right' },
  status: { color: '#475569', fontSize: 20, fontWeight: 'bold', marginTop: 28, letterSpacing: 2 },
  spinning: { color: '#22D3EE' },
  hint: { color: '#475569', fontSize: 13, marginTop: 16, textAlign: 'center', paddingHorizontal: 40 },
});
