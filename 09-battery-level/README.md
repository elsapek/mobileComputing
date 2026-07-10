# Battery Level

**Session 2**

A device-info API with a live listener. The battery bar and charging state update in real time.

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. Install this app's packages inside `demo/`:

```bash
npx expo install expo-battery
```

4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

Plug/unplug the phone to watch the charging state flip live.
