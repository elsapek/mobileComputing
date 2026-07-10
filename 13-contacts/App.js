import { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | denied | empty | ok

  const load = async () => {
    // 1. Ask permission — contacts are personal data, so this is gated
    const { status: perm } = await Contacts.requestPermissionsAsync();
    if (perm !== 'granted') {
      setStatus('denied');
      return;
    }
    // 2. Read the address book
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
      sort: Contacts.SortTypes.FirstName,
    });
    const named = data.filter((c) => c.name);
    setContacts(named);
    setStatus(named.length ? 'ok' : 'empty');
  };

  // Permission refused
  if (status === 'denied') {
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>🔒</Text>
        <Text style={styles.title}>Permission denied</Text>
        <Text style={styles.note}>
          Contacts are personal data, so the OS blocks access until you allow it. On iPhone, once you deny it the
          app can't ask again — you'd re-enable it in Settings → Expo Go → Contacts.
        </Text>
      </View>
    );
  }

  // Granted, but nothing to show (common on a fresh simulator)
  if (status === 'empty') {
    return (
      <View style={styles.screen}>
        <Text style={styles.emoji}>📇</Text>
        <Text style={styles.title}>No contacts found</Text>
        <Text style={styles.note}>
          Permission was granted, but this device's address book is empty. Common on a fresh simulator — try a real
          phone.
        </Text>
      </View>
    );
  }

  // Got contacts
  if (status === 'ok') {
    return (
      <View style={styles.screen}>
        <Text style={styles.header}>{contacts.length} contacts</Text>
        <FlatList
          data={contacts}
          keyExtractor={(item, i) => item.id ?? String(i)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.name}>{item.name}</Text>
              {item.phoneNumbers?.[0] ? (
                <Text style={styles.phone}>{item.phoneNumbers[0].number}</Text>
              ) : (
                <Text style={styles.noPhone}>no number</Text>
              )}
            </View>
          )}
        />
      </View>
    );
  }

  // Start screen
  return (
    <View style={styles.screen}>
      <Text style={styles.emoji}>📇</Text>
      <Text style={styles.title}>Contacts</Text>
      <Text style={styles.note}>Reads your address book — after you grant permission.</Text>
      <Pressable style={styles.button} onPress={load}>
        <Text style={styles.buttonText}>Load contacts</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center' },
  header: {
    color: '#22D3EE',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'stretch',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 12,
  },
  list: { paddingHorizontal: 24, paddingBottom: 40 },
  row: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  name: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  phone: { color: '#94A3B8', fontSize: 14, marginTop: 4 },
  noPhone: { color: '#475569', fontSize: 13, marginTop: 4, fontStyle: 'italic' },
  emoji: { fontSize: 64, marginBottom: 12 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  note: { color: '#94A3B8', fontSize: 15, textAlign: 'center', paddingHorizontal: 40, lineHeight: 22 },
  button: {
    backgroundColor: '#22D3EE',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 24,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
