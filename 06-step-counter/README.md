# Step Counter

**Session 2**

The pedometer — and a real platform difference. Android needs an explicit permission; iOS grants it silently.

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

IMPORTANT (Android): the app asks for `ACTIVITY_RECOGNITION` when you tap Start — accept it. If it still doesn't count, disable battery optimisation for Expo Go: Settings → Battery → Expo Go → Unrestricted. Emulators have no step hardware — use a real phone.
