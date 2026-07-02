import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    // 100 real photos — enough rows to actually scroll
    const res = await fetch('https://picsum.photos/v2/list?limit=100');
    const json = await res.json();
    setPhotos(json);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image
        style={styles.thumb}
        source={{ uri: `https://picsum.photos/id/${item.id}/80/80` }}
      />
      <View style={styles.info}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.dims}>
          {item.width} × {item.height}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#22D3EE" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>Photo Feed</Text>
      <FlatList
        data={photos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', paddingTop: 60 },
  center: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  header: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold', marginBottom: 16, paddingHorizontal: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#1E293B',
    borderBottomWidth: 1,
  },
  thumb: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#1E293B' },
  info: { marginLeft: 14, flex: 1 },
  author: { color: '#FFFFFF', fontSize: 16 },
  dims: { color: '#94A3B8', fontSize: 13, marginTop: 2 },
});
