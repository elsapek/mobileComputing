# Weather App (Capstone)

**Session 3**

Everything combined: GPS → reverse-geocode the town name → call a live API → render, with loading, error, and refresh states.

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

Weather comes from Open-Meteo (free, no API key). For smaller towns Apple's geocoder often leaves `city` empty, so the code falls through subregion → district → region → name. No package needed for the weather call — it's a plain `fetch`.
