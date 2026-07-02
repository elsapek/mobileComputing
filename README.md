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

---

## The apps

| # | App | Session | Teaches | Extra package |
|---|-----|:---:|---------|---------------|
| 01 | [Hello World](01-hello-world) | 1 | View · Text · StyleSheet | — |
| 02 | [Temperature Converter](02-temp-converter) | 1 | useState · TextInput | — |
| 03 | [Movies List](03-movies-list) | 1 | fetch · FlatList · loading state | — |
| 04 | [Tilt Meter](04-tilt-meter) | 2 | Accelerometer (live x/y/z) | expo-sensors |
| 05 | [Compass](05-compass) | 2 | Magnetometer → heading | expo-sensors |
| 06 | [Step Counter](06-step-counter) | 2 | Pedometer · Android permissions | expo-sensors |
| 07 | [Light Sensor](07-light-sensor) | 2 | Ambient light · platform limits | expo-sensors |
| 08 | [Battery Level](08-battery-level) | 2 | Device info · live listeners | expo-battery |
| 09 | [GPS Location](09-gps-location) | 3 | Location permission · coordinates | expo-location |
| 10 | [Camera](10-camera) | 3 | CameraView · flip · snap | expo-camera |
| 11 | [Reaction Game](11-reaction-game) | 3 | State machine · timing | — |
| 12 | [Weather (Capstone)](12-weather) | 3 | GPS + live API + polish | expo-location |

---

## Two platform-difference lessons worth flagging

- **Step Counter** — Android requires the `ACTIVITY_RECOGNITION` permission before it reports steps; iOS grants it silently. On some Android phones, battery optimisation also has to be disabled for Expo Go (Settings → Battery → Expo Go → Unrestricted).
- **Light Sensor** — Android only. iOS reserves the ambient light sensor for the system, so the app shows an explanatory screen on an iPhone. Best demoed on an Android device.

---

## Data sources (both free, no keys)

- Movies list: `https://reactnative.dev/movies.json`
- Weather: [Open-Meteo](https://open-meteo.com) — `api.open-meteo.com/v1/forecast`
