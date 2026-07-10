import { useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import * as Location from 'expo-location';

// Open-Meteo weathercode → human description + emoji
const CODES = {
  0: ['Clear sky', '☀️'],
  1: ['Mainly clear', '🌤️'],
  2: ['Partly cloudy', '⛅'],
  3: ['Overcast', '☁️'],
  45: ['Fog', '🌫️'],
  48: ['Rime fog', '🌫️'],
  51: ['Light drizzle', '🌦️'],
  61: ['Rain', '🌧️'],
  63: ['Moderate rain', '🌧️'],
  65: ['Heavy rain', '🌧️'],
  71: ['Snow', '🌨️'],
  73: ['Moderate snow', '🌨️'],
  75: ['Heavy snow', '❄️'],
  80: ['Rain showers', '🌦️'],
  95: ['Thunderstorm', '⛈️'],
  99: ['Hailstorm', '⛈️'],
};

export default function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Permission + GPS (reused from the Location demo)
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      // 2. Name the place. For smaller towns `city` is often empty,
      //    so fall through subregion → district → region → name.
      const places = await Location.reverseGeocodeAsync({ latitude, longitude });
      setCity(
        places[0]?.city ??
          places[0]?.subregion ??
          places[0]?.district ??
          places[0]?.region ??
          places[0]?.name ??
          'Unknown location'
      );

      // 3. Ask Open-Meteo for the current weather (no API key needed)
      const url =
        'https://api.open-meteo.com/v1/forecast' +
        `?latitude=${latitude}` +
        `&longitude=${longitude}` +
        '&current_weather=true';
      const res = await fetch(url);
      const json = await res.json();
      setWeather(json.current_weather);
    } catch (e) {
      setError('Could not load weather — check your connection');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color="#22D3EE" />
        <Text style={styles.sub}>Finding you…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>⚠️</Text>
        <Text style={styles.sub}>{error}</Text>
        <Pressable style={styles.button} onPress={load}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const [desc, icon] = CODES[weather.weathercode] ?? ['Unknown', '❓'];

  return (
    <View style={styles.screen}>
      <Text style={styles.city}>{city}</Text>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.temp}>{Math.round(weather.temperature)}°C</Text>
      <Text style={styles.desc}>{desc}</Text>
      <Text style={styles.wind}>Wind {weather.windspeed} km/h</Text>

      <Pressable style={styles.button} onPress={load}>
        <Text style={styles.buttonText}>↻ Refresh</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  city: { color: '#FFFFFF', fontSize: 26, marginBottom: 8 },
  icon: { fontSize: 96 },
  temp: { color: '#FFFFFF', fontSize: 88, fontWeight: 'bold' },
  desc: { color: '#22D3EE', fontSize: 24, marginBottom: 8 },
  wind: { color: '#94A3B8', fontSize: 18 },
  sub: { color: '#94A3B8', fontSize: 18, marginTop: 16 },
  emoji: { fontSize: 64, marginBottom: 12 },
  button: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 28,
    marginTop: 32,
  },
  buttonText: { color: '#22D3EE', fontSize: 16, fontWeight: 'bold' },
});
