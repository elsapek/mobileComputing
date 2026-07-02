# Movies List

**Session 1**

Your first network call: `fetch` + `.json()`, a loading spinner (`ActivityIndicator`), and an efficient scrollable `FlatList`.

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. Install this app's packages inside `demo/`:

_No extra packages — uses only React Native core._

4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

Data comes from `https://reactnative.dev/movies.json`. This fetch → store → render pattern is exactly what the Weather capstone reuses.
