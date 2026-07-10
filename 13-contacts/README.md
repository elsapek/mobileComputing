# Contacts

**Session 3**

Reading personal data behind a permission gate. Grant access and the app lists the device's address book.

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. Install this app's packages inside `demo/`:

```bash
npx expo install expo-contacts
```

4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

The clearest **privacy-permission** demo: contacts are personal data, so `Contacts.requestPermissionsAsync()` must return `'granted'` before `getContactsAsync()` returns anything. Same ask → check → use pattern as GPS and the camera.

Three failure states are handled explicitly, so the screen never just looks broken:

- **Denied** — a message explaining the block, plus the iOS gotcha: once denied, the app can't re-prompt; the user must re-enable it in Settings.
- **Empty** — permission granted but no contacts (common on a fresh simulator) gets its own message rather than a blank list.
- **No number** — a contact with a name but no phone still renders cleanly.

Best run on a **real phone**, where the address book actually has entries.
