# Photo Feed

**Session 1** — replaces the old Movies List demo.

Your first network call, but with enough rows to actually scroll: `fetch` + a loading spinner + a `FlatList` of 100 real photos, each with a remote thumbnail `Image`.

Data comes from [Lorem Picsum](https://picsum.photos) — free, no key. (The old `jsonplaceholder/photos` feed was dropped because its thumbnails point at `via.placeholder.com`, which is dead as of 2026 and renders blank.)

## Run it

1. Create a blank Expo app (once): `npx create-expo-app@latest demo --template blank`
2. Replace `demo/App.js` with the `App.js` in this folder.
3. No extra packages — uses only React Native core.
4. Start it and scan the QR with Expo Go:

```bash
npx expo start
```

## Notes

- **Why FlatList and not ScrollView?** `ScrollView` renders every row up front; `FlatList` only renders what's on screen and recycles rows as you scroll. With 100 image rows the difference is the whole point of the demo — scroll fast and it stays smooth.
- **The list scrolls** because there are far more rows than fit on screen. Bump `limit=100` toward the ~1000 images Picsum offers if you want an even longer list.
- **Remote images**: `Image` takes a `source={{ uri }}`. Here the thumbnail URL is built per row from the photo's `id`: `https://picsum.photos/id/{id}/80/80`.
- Fields returned by the list endpoint: `id`, `author`, `width`, `height`, `url`, `download_url`.
