import { useState, useRef } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  // Permission not asked yet
  if (!permission) {
    return <View style={styles.screen} />;
  }

  // Permission not granted
  if (!permission.granted) {
    return (
      <View style={styles.screen}>
        <Text style={styles.info}>We need your permission to use the camera</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant permission</Text>
        </Pressable>
      </View>
    );
  }

  const flip = () => setFacing((f) => (f === 'back' ? 'front' : 'back'));

  const snap = async () => {
    const pic = await cameraRef.current.takePictureAsync();
    setPhoto(pic.uri);
  };

  // Show the captured photo with a retake option
  if (photo) {
    return (
      <View style={styles.screen}>
        <Image source={{ uri: photo }} style={styles.preview} />
        <Pressable style={styles.button} onPress={() => setPhoto(null)}>
          <Text style={styles.buttonText}>↺ Retake</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing} />
      <View style={styles.controls}>
        <Pressable style={styles.smallButton} onPress={flip}>
          <Text style={styles.buttonText}>🔄 Flip</Text>
        </Pressable>
        <Pressable style={styles.shutter} onPress={snap}>
          <Text style={styles.shutterText}>📸</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  camera: { width: '100%', flex: 1 },
  preview: { width: '100%', flex: 1, resizeMode: 'contain' },
  controls: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  shutter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterText: { fontSize: 32 },
  smallButton: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  button: {
    backgroundColor: '#22D3EE',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 24,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  info: { color: '#94A3B8', fontSize: 16, textAlign: 'center', paddingHorizontal: 40, marginBottom: 20 },
});
