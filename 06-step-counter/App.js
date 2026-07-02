import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';

export default function App() {
  const [steps, setSteps] = useState(0);
  const [available, setAvail] = useState(null);
  const [active, setActive] = useState(false);
  const [permError, setPermError] = useState(false);
  const subRef = useRef(null);

  useEffect(() => {
    Pedometer.isAvailableAsync().then(setAvail);
    return () => subRef.current?.remove();
  }, []);

  const startCounting = async () => {
    // Android REQUIRES this permission before it will report steps.
    // iOS grants it silently through Core Motion.
    const { status } = await Pedometer.requestPermissionsAsync();
    if (status !== 'granted') {
      setPermError(true);
      return;
    }

    setPermError(false);
    setSteps(0);
    setActive(true);
    subRef.current = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });
  };

  const stop = () => {
    subRef.current?.remove();
    setActive(false);
  };

  if (available === null) {
    return (
      <View style={styles.screen}>
        <Text style={styles.sub}>Checking pedometer…</Text>
      </View>
    );
  }

  if (!available) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>😔</Text>
        <Text style={styles.sub}>Pedometer not available on this device</Text>
        <Text style={styles.hint}>
          Tip: emulators have no step-counter hardware — use a real phone.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Step Counter</Text>
      <Text style={styles.emoji}>👟</Text>
      <Text style={styles.steps}>{steps}</Text>
      <Text style={styles.sub}>steps</Text>

      {!active ? (
        <Pressable style={styles.button} onPress={startCounting}>
          <Text style={styles.buttonText}>Start counting</Text>
        </Pressable>
      ) : (
        <Pressable style={[styles.button, { backgroundColor: '#EF4444' }]} onPress={stop}>
          <Text style={styles.buttonText}>Stop</Text>
        </Pressable>
      )}

      {permError && (
        <Text style={styles.error}>
          Permission denied — enable Activity Recognition in phone Settings
        </Text>
      )}

      <Text style={styles.hint}>
        {active
          ? 'Walk around — steps are counting live'
          : 'Tap Start, then walk around the room'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#22D3EE', fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  emoji: { fontSize: 64, marginBottom: 8 },
  steps: { color: '#FFFFFF', fontSize: 96, fontWeight: 'bold', lineHeight: 104 },
  sub: { color: '#94A3B8', fontSize: 18, marginBottom: 32 },
  button: {
    backgroundColor: '#22D3EE',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginBottom: 20,
  },
  buttonText: { color: '#0F172A', fontSize: 18, fontWeight: 'bold' },
  error: { color: '#F59E0B', fontSize: 13, textAlign: 'center', paddingHorizontal: 40, marginBottom: 12 },
  hint: { color: '#475569', fontSize: 13, textAlign: 'center', paddingHorizontal: 40 },
});
