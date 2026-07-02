import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await fetch('https://reactnative.dev/movies.json');
    const json = await res.json();
    setMovies(json.movies);
    setLoading(false);
  };

  const renderMovie = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.year}>{item.releaseYear}</Text>
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
      <Text style={styles.header}>Popular Movies</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={renderMovie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', paddingTop: 60, paddingHorizontal: 20 },
  center: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  header: { color: '#22D3EE', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomColor: '#1E293B',
    borderBottomWidth: 1,
  },
  movieTitle: { color: '#FFFFFF', fontSize: 16, flex: 1 },
  year: { color: '#94A3B8', fontSize: 16 },
});
