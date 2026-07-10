# QR Scanner

**Session 3**

The camera as a data *input*, not just a picture-taker. Point at a QR code and get the decoded text — if it's a link, open it.

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. Install this app's packages inside `demo/`:

```bash
npx expo install expo-camera
```

4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

Reuses the **same camera permission** as the Camera demo — no new API to learn, just a new use for it. The barcode scanner is built into `expo-camera`'s `CameraView` (`barcodeScannerSettings={{ barcodeTypes: ['qr'] }}`), so nothing extra to install.

`onBarcodeScanned` fires many times per second. This demo stops the stream simply by switching to a result screen (the `CameraView` is no longer rendered), which is the cleanest way to avoid a flood of repeat scans.

To try it live: search "QR code generator", encode any text or a URL, and point the phone at your laptop screen.
