# GPS Location

**Session 3**

The permission → read pattern for location. Returns real latitude/longitude.

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. Install this app's packages inside `demo/`:

```bash
npx expo install expo-location
```

4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

These coordinates feed directly into the Weather capstone. Denying permission is a valid state — the app handles it with a message.
