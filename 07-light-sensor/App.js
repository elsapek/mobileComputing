import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { LightSensor } from 'expo-sensors';

export default function App() {
  const [lux, setLux] = useState(0);
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    let sub;
    LightSensor.isAvailableAsync().then((ok) => {
      setAvailable(ok);
      if (ok) {
        LightSensor.setUpdateInterval(300);
        sub = LightSensor.addListener(({ illuminance }) => setLux(illuminance));
      }
    });
    return () => sub && sub.remove();
  }, []);

  // iOS deliberately does not expose the ambient light sensor to apps.
  if (available === false) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>🔒</Text>
        <Text style={styles.title}>Light sensor unavailable</Text>
        <Text style={styles.note}>
          {Platform.OS === 'ios'
            ? 'iOS reserves the ambient light sensor for the system — apps cannot read it. A real platform-difference lesson: run this one on an Android phone.'
            : 'No light sensor found on this device.'}
        </Text>
      </View>
    );
  }

  // Rough brightness label from the lux reading
  const label =
    lux < 10 ? 'Dark' : lux < 200 ? 'Dim' : lux < 1000 ? 'Indoor light' : 'Bright';

  return (
    <View style={[styles.screen, { backgroundColor: shade(lux) }]}>
      <Text style={styles.emoji}>💡</Text>
      <Text style={styles.lux}>{Math.round(lux)}</Text>
      <Text style={styles.unit}>lux</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.hint}>Cover the sensor or shine a light — the value reacts</Text>
    </View>
  );
}

// Background gets lighter as the room gets brighter
function shade(lux) {
  const t = Math.min(lux / 1000, 1); // 0..1
  const v = Math.round(15 + t * 60); // 15..75
  return `rgb(${v},${v + 10},${v + 25})`;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 64, marginBottom: 12 },
  lux: { color: '#FFFFFF', fontSize: 88, fontWeight: 'bold' },
  unit: { color: '#94A3B8', fontSize: 20, marginBottom: 8 },
  label: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold' },
  title: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  note: { color: '#94A3B8', fontSize: 15, textAlign: 'center', paddingHorizontal: 32, lineHeight: 22 },
  hint: { color: '#475569', fontSize: 13, marginTop: 16, textAlign: 'center', paddingHorizontal: 40 },
});
