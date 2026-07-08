# Gyroscope

**Session 2**

The gyroscope. Reads how fast the phone rotates around each axis (x, y, z) in radians per second, and shows a live bar per axis.

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. Install this app's packages inside `demo/`:

```bash
npx expo install expo-sensors
```

4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

Values sit near zero when the phone is still and rise only while you rotate it — the opposite of the accelerometer, which always feels gravity. Emulators usually have no gyroscope, so run this one on a real device.
