# Mobile Computing — React Native Lab

Working demo apps for a hands-on Mobile Computing lab, built with **React Native** and **Expo**. Each folder is one small, self-contained app: drop its `App.js` into a blank Expo project, install its packages, and run.

The apps run through **Expo Go on a real phone** — entirely from your own machine. No Snack, no cloud build, no accounts. (Expo is the tooling; nothing here depends on Expo's online services.)

---

## Running any app (the only 4 steps you need)

You do this **once** to create a project, then reuse it for every app.

```bash
# 1. Create a blank Expo project (one time)
npx create-expo-app@latest demo --template blank
cd demo
```

```bash
# 2. Copy an app in — e.g. the Tilt Meter
#    Open this repo's 04-tilt-meter/App.js and paste it over demo/App.js
```

```bash
# 3. Install THAT app's packages (see each app's README; some need none)
npx expo install expo-sensors        # example — only if the app lists it

# 4. Start it, then scan the QR code with the Expo Go app on your phone
npx expo start
```

To run a different app later: paste its `App.js` over `demo/App.js`, install any packages it lists, and `npx expo start` again.

### First-time setup

- Install **Node.js** (LTS) and the **Expo Go** app from the App Store / Play Store.
- Phone and computer must be on the **same Wi-Fi** so the phone can reach the bundle.
- Windows PowerShell blocking `npx`? Run once:
  `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
- Always use `npx expo install <pkg>` (not `npm install`) for Expo packages — it picks versions that match your SDK.

