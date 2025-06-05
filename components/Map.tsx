import { markers } from '@/components/LocationList';
import { useNavigation } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';

export default function Map() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colorScheme === 'dark' ? '#1e293b' : '#0ea5e9',
      },
      headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
      headerTitle: 'Map View',
      headerRight: () => (
        <TouchableOpacity onPress={() => {}}>
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [colorScheme]);

  if (Platform.OS === 'web') {
    return (
      <View style={styles.wrapper}>
        <View style={styles.mapCard}>
          <View style={styles.webMapFallback}>
            <Text style={styles.webMapText}>
              Maps are not supported in web version.
              {markers.map((marker, index) => (
                <View key={index} style={styles.markerInfo}>
                  <Text style={styles.title}>{marker.name}</Text>
                  <Text style={styles.subtitle}>
                    Lat: {marker.latitude.toFixed(3)}, Lon: {marker.longitude.toFixed(3)}
                  </Text>
                </View>
              ))}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.mapCard}>
        {Platform.select({
          ios: () => import('./NativeMap').then(m => m.default()),
          android: () => import('./NativeMap').then(m => m.default()),
          default: () => null,
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 10,
    width: '100%',
    height: '100%'
  },
  mapCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    width: '100%',
    height: '100%',
  },
  webMapFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  webMapText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  markerInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#1e40af',
  },
  subtitle: {
    fontSize: 13,
    color: '#475569',
  },
});