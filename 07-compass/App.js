import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Magnetometer } from 'expo-sensors';

// Turn raw magnetometer x/y into a 0–359° compass heading
function angle({ x, y }) {
  let deg = Math.atan2(y, x) * (180 / Math.PI);
  deg = deg - 90;              // align 0° to "up"
  if (deg < 0) deg += 360;
  return Math.round(deg);
}

function direction(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return dirs[Math.round(deg / 45) % 8];
}

export default function App() {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    Magnetometer.setUpdateInterval(100);
    const sub = Magnetometer.addListener((data) => setHeading(angle(data)));
    return () => sub.remove();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Compass</Text>

      {/* The rose rotates opposite to the heading so N always points north */}
      <View style={[styles.rose, { transform: [{ rotate: `${-heading}deg` }] }]}>
        <Text style={styles.north}>N</Text>
        <Text style={styles.needle}>▲</Text>
      </View>

      <Text style={styles.degrees}>{heading}°</Text>
      <Text style={styles.dir}>{direction(heading)}</Text>
      <Text style={styles.hint}>Turn around — the N mark tracks magnetic north</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold', marginBottom: 32 },
  rose: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderColor: '#334155',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  north: { color: '#EF4444', fontSize: 28, fontWeight: 'bold' },
  needle: { color: '#22D3EE', fontSize: 40, marginTop: 6 },
  degrees: { color: '#FFFFFF', fontSize: 56, fontWeight: 'bold', marginTop: 32 },
  dir: { color: '#94A3B8', fontSize: 22 },
  hint: { color: '#475569', fontSize: 13, marginTop: 16, textAlign: 'center', paddingHorizontal: 40 },
});
