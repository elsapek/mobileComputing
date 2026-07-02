import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [celsius, setCelsius] = useState('');

  const toFahrenheit = (c) => (c * 9) / 5 + 32;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temp Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter °C"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
        value={celsius}
        onChangeText={setCelsius}
      />

      <Text style={styles.result}>
        {celsius ? toFahrenheit(Number(celsius)).toFixed(1) + ' °F' : '—'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  input: {
    width: 220,
    borderColor: '#22D3EE',
    borderWidth: 2,
    borderRadius: 12,
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: 12,
    marginBottom: 24,
  },
  result: { color: '#FFFFFF', fontSize: 48, fontWeight: 'bold' },
});
