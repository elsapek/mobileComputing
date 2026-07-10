import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// Show the notification even while the app is open (foreground).
// The old shouldShowAlert is deprecated — SDK 54 uses shouldShowBanner / shouldShowList.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [status, setStatus] = useState('idle'); // idle | denied | ready | scheduled | received
  const [lastBody, setLastBody] = useState(null);

  useEffect(() => {
    const sub = Notifications.addNotificationReceivedListener((n) => {
      setLastBody(n.request.content.body);
      setStatus('received');
    });
    return () => sub.remove();
  }, []);

  const enable = async () => {
    // Android 8+ silently drops notifications with no channel — always create one first.
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'Default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }
    const { status: perm } = await Notifications.requestPermissionsAsync();
    setStatus(perm === 'granted' ? 'ready' : 'denied');
  };

  const schedule = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Reminder',
        body: 'This fired 5 seconds after you tapped the button.',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 5,
      },
    });
    setStatus('scheduled');
  };

  // Permission refused
  if (status === 'denied') {
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>🔕</Text>
        <Text style={styles.title}>Notifications blocked</Text>
        <Text style={styles.note}>
          You denied permission. On iPhone the app can't ask again — re-enable it in Settings → Expo Go →
          Notifications.
        </Text>
      </View>
    );
  }

  // Start screen
  if (status === 'idle') {
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>🔔</Text>
        <Text style={styles.title}>Local Notifications</Text>
        <Text style={styles.note}>
          Schedule a reminder the phone shows later — no server, no internet. It needs your permission first.
        </Text>
        <Pressable style={styles.button} onPress={enable}>
          <Text style={styles.buttonText}>Enable notifications</Text>
        </Pressable>
      </View>
    );
  }

  // Ready / scheduled / received
  return (
    <View style={styles.screen}>
      <Text style={styles.emoji}>🔔</Text>
      <Text style={styles.title}>Ready</Text>
      <Pressable style={styles.button} onPress={schedule}>
        <Text style={styles.buttonText}>Schedule in 5 seconds</Text>
      </Pressable>
      {status === 'scheduled' && (
        <Text style={styles.pending}>
          Scheduled — watch for the banner in 5s. Lock the phone to see it land on the lock screen.
        </Text>
      )}
      {status === 'received' && <Text style={styles.received}>📬 Delivered: {lastBody}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 64, marginBottom: 12 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  note: { color: '#94A3B8', fontSize: 15, textAlign: 'center', paddingHorizontal: 40, lineHeight: 22 },
  pending: { color: '#FBBF24', fontSize: 14, textAlign: 'center', paddingHorizontal: 40, marginTop: 20, lineHeight: 20 },
  received: { color: '#22D3EE', fontSize: 15, textAlign: 'center', paddingHorizontal: 40, marginTop: 20, fontWeight: '600' },
  button: {
    backgroundColor: '#22D3EE',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 24,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
