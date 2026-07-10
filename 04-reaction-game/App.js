import { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

// Screen states: 'idle' | 'waiting' | 'go' | 'result' | 'tooSoon'
export default function App() {
  const [state, setState] = useState('idle');
  const [ms, setMs] = useState(0);
  const [best, setBest] = useState(null);
  const startRef = useRef(0);
  const timerRef = useRef(null);

  const begin = () => {
    setState('waiting');
    const delay = 1500 + Math.random() * 3500; // 1.5–5s random
    timerRef.current = setTimeout(() => {
      startRef.current = Date.now();
      setState('go');
    }, delay);
  };

  const tap = () => {
    if (state === 'idle' || state === 'result' || state === 'tooSoon') {
      begin();
    } else if (state === 'waiting') {
      // Tapped before green — cheating!
      clearTimeout(timerRef.current);
      setState('tooSoon');
    } else if (state === 'go') {
      const time = Date.now() - startRef.current;
      setMs(time);
      setBest((b) => (b === null ? time : Math.min(b, time)));
      setState('result');
    }
  };

  const bg =
    state === 'go' ? '#16A34A' : state === 'waiting' ? '#B91C1C' : '#0F172A';

  return (
    <Pressable style={[styles.screen, { backgroundColor: bg }]} onPress={tap}>
      {state === 'idle' && (
        <>
          <Text style={styles.title}>Reaction Test</Text>
          <Text style={styles.big}>👆</Text>
          <Text style={styles.info}>Tap anywhere to start</Text>
        </>
      )}

      {state === 'waiting' && (
        <>
          <Text style={styles.info}>Wait for green…</Text>
          <Text style={styles.big}>🔴</Text>
        </>
      )}

      {state === 'go' && <Text style={styles.tapNow}>TAP!</Text>}

      {state === 'result' && (
        <>
          <Text style={styles.ms}>{ms} ms</Text>
          <Text style={styles.info}>Best: {best} ms</Text>
          <Text style={styles.hint}>Tap to try again</Text>
        </>
      )}

      {state === 'tooSoon' && (
        <>
          <Text style={styles.title}>Too soon! 😅</Text>
          <Text style={styles.hint}>Wait for green. Tap to retry.</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { color: '#22D3EE', fontSize: 28, fontWeight: 'bold', marginBottom: 16 },
  big: { fontSize: 72, marginVertical: 12 },
  tapNow: { color: '#FFFFFF', fontSize: 72, fontWeight: 'bold' },
  ms: { color: '#FFFFFF', fontSize: 80, fontWeight: 'bold' },
  info: { color: '#E2E8F0', fontSize: 22, marginTop: 8 },
  hint: { color: '#CBD5E1', fontSize: 15, marginTop: 16 },
});
