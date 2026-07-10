# Reaction Game


A tiny state machine and timing with `Date.now()`. Tap when the screen turns green; it measures your reaction in milliseconds.

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

No packages — pure React state. A fun palate-cleanser before the capstone. Tapping too early is handled ('Too soon!').
