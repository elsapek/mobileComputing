# Camera

**Session 3**

A richer permission flow plus the camera preview: flip front/back and take a photo.

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. Install this app's packages inside `demo/`:

```bash
npx expo install expo-camera
```

4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

Uses the modern `CameraView` + `useCameraPermissions` API (Expo SDK 51+). Grant the camera permission on first launch.
