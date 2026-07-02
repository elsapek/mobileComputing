import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Battery from 'expo-battery';

export default function App() {
  const [level, setLevel] = useState(null); // 0..1
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    // Read once at startup…
    Battery.getBatteryLevelAsync().then(setLevel);
    Battery.getBatteryStateAsync().then((s) =>
      setCharging(s === Battery.BatteryState.CHARGING || s === Battery.BatteryState.FULL)
    );

    // …then listen for live changes
    const levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) =>
      setLevel(batteryLevel)
    );
    const stateSub = Battery.addBatteryStateListener(({ batteryState }) =>
      setCharging(
        batteryState === Battery.BatteryState.CHARGING ||
          batteryState === Battery.BatteryState.FULL
      )
    );

    return () => {
      levelSub.remove();
      stateSub.remove();
    };
  }, []);

  const pct = level === null ? 0 : Math.round(level * 100);
  const color = pct <= 20 ? '#EF4444' : pct <= 50 ? '#F59E0B' : '#22D3EE';

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Battery Level</Text>

      {/* Simple battery shape that fills up */}
      <View style={styles.body}>
        <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
      </View>
      <View style={styles.tip} />

      <Text style={[styles.pct, { color }]}>{pct}%</Text>
      <Text style={styles.state}>{charging ? '⚡ Charging' : 'On battery'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  title: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold', marginBottom: 40 },
  body: {
    width: 200,
    height: 90,
    borderRadius: 12,
    borderColor: '#334155',
    borderWidth: 3,
    padding: 4,
    justifyContent: 'center',
  },
  fill: { height: '100%', borderRadius: 6 },
  tip: {
    width: 10,
    height: 30,
    backgroundColor: '#334155',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: 200,
    marginTop: -60,
  },
  pct: { fontSize: 64, fontWeight: 'bold', marginTop: 40 },
  state: { color: '#94A3B8', fontSize: 18, marginTop: 4 },
});
