import { markers } from '@/components/LocationList';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';

const INITIAL_REGION = {
  latitude: 28.6139,
  longitude: 77.2090,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export default function NativeMap() {
  const onMarkerSelected = (marker: any) => {
    console.log('Marker selected:', marker);
  };

  const calloutPressed = (ev: any) => {
    console.log('Callout pressed:', ev);
  };

  const onRegionChange = (region: Region) => {
    console.log('Region changed:', region);
  };

  return (
    <MapView
      style={StyleSheet.absoluteFillObject}
      initialRegion={INITIAL_REGION}
      showsUserLocation
      showsMyLocationButton
      provider={PROVIDER_GOOGLE}
      onRegionChangeComplete={onRegionChange}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          title={marker.name}
          coordinate={marker}
          onPress={() => onMarkerSelected(marker)}
        >
          <Callout onPress={calloutPressed}>
            <View style={styles.callout}>
              <Text style={styles.title}>{marker.name}</Text>
              <Text style={styles.subtitle}>
                Lat: {marker.latitude.toFixed(3)}, Lon: {marker.longitude.toFixed(3)}
              </Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  callout: {
    padding: 8,
    maxWidth: 200,
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