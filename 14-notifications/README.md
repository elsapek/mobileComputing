# Local Notifications

**Session 3**

Ask the OS to show a reminder later. Tap the button, background the app, and the notification fires 5 seconds on.

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. Install this app's packages inside `demo/`:

```bash
npx expo install expo-notifications
```

4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

**Local, not push.** This schedules a notification *on the device* — no server, no internet, no account. As of SDK 53+, **push (remote) notifications no longer work in Expo Go** and need a development build; local notifications still work fine. That split is itself the lesson: "the phone can remind itself for free; sending from a server is a bigger job."

**The silent-failure trap (Android):** on Android 8+, a notification with **no channel is dropped with no error at all**. This demo calls `setNotificationChannelAsync('default', …)` before requesting permission, so it never silently fails. Leave it out and it "works" on iOS but mysteriously does nothing on Android — a classic gotcha.

**Foreground handler:** `setNotificationHandler` uses the SDK 54 fields `shouldShowBanner` / `shouldShowList` (the older `shouldShowAlert` is deprecated). Without a handler, a notification arriving while the app is open is hidden by default.

**iOS denial is permanent:** deny once and the app can't re-prompt — re-enable it in Settings → Expo Go → Notifications.

Trigger uses the typed form `{ type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 5 }`.
