# Compass

**Session 2**

The magnetometer. We convert raw x/y into a 0–359° heading and rotate a compass rose.

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

Works best away from laptops/speakers (magnets distort the reading). A real 'sensors are messy' teaching moment.
