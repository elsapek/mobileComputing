import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [result, setResult] = useState(null); // null = scanning, { type, data } = a hit

  // Permission not asked yet
  if (!permission) {
    return <View style={styles.screen} />;
  }

  // Permission not granted
  if (!permission.granted) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>📷</Text>
        <Text style={styles.title}>Camera permission needed</Text>
        <Text style={styles.note}>
          The scanner uses the camera to read QR codes. Nothing is uploaded — the phone decodes it on-device.
        </Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  // We have a result — show it, offer to open a link or scan again
  if (result) {
    const isLink = /^https?:\/\//i.test(result.data);
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>✅</Text>
        <Text style={styles.title}>Scanned</Text>
        <Text style={styles.badge}>{result.type}</Text>
        <Text style={styles.data} selectable>
          {result.data}
        </Text>
        {isLink && (
          <Pressable style={styles.linkButton} onPress={() => Linking.openURL(result.data)}>
            <Text style={styles.buttonText}>Open link ↗</Text>
          </Pressable>
        )}
        <Pressable style={styles.button} onPress={() => setResult(null)}>
          <Text style={styles.buttonText}>Scan again</Text>
        </Pressable>
      </View>
    );
  }

  // Actively scanning. Not rendering CameraView on the result screen stops the stream.
  return (
    <View style={styles.screen}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={({ type, data }) => setResult({ type, data })}
      />
      <View style={styles.overlay} pointerEvents="none">
        <View style={styles.frame} />
        <Text style={styles.hint}>Point at a QR code</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  overlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  frame: {
    width: 240,
    height: 240,
    borderWidth: 3,
    borderColor: '#22D3EE',
    borderRadius: 24,
    backgroundColor: 'transparent',
  },
  hint: { color: '#FFFFFF', fontSize: 16, marginTop: 24, fontWeight: '600' },
  emoji: { fontSize: 64, marginBottom: 12 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  badge: {
    color: '#22D3EE',
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  data: {
    color: '#E2E8F0',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 8,
  },
  note: { color: '#94A3B8', fontSize: 15, textAlign: 'center', paddingHorizontal: 40, lineHeight: 22 },
  button: {
    backgroundColor: '#22D3EE',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 20,
  },
  linkButton: {
    backgroundColor: '#1E40AF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 20,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
