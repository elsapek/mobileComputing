# Tilt Meter

**Session 2**

Reading a hardware sensor. The accelerometer streams live x/y/z; we map it to a dot that rolls with gravity.

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

`setUpdateInterval(80)` controls smoothness. Always `sub.remove()` on cleanup so the sensor stops when the screen closes.
