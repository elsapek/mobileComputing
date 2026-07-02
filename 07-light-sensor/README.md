# Light Sensor

**Session 2**

Ambient brightness in lux — and the sharpest platform lesson of the course.

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

ANDROID ONLY. iOS reserves the light sensor for the system, so on an iPhone the app shows an explanatory screen instead of a reading. Demo this one on an Android phone.
