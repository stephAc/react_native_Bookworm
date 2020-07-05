import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Vibration, Alert } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import GoogleService from '../services/google.service';
import { Camera } from 'expo-camera';

const Scanner = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    Vibration.vibrate();
    const isISBN = data.slice(0, 3) === "978";
    if (!isISBN) {
      Alert.alert(
        "Sérieusement ? ಠ_ಠ",
        "Ce que vous avez scanné ne ressemble pas trop à un livre...",
        [{ text: "Oups (‘ ͡ . ͜ ʖ ͡ .)", onPress: () => setScanned(false) }]
      );
    } else {
      await GoogleService.searchByISBN(data)
        .then(({ data }) => navigation.replace('Details', { data }));
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.ean13],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio='16:9'
        style={[StyleSheet.absoluteFillObject, styles.camera]}
      >
        <View style={styles.barCodeRect}>

        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  barCodeRect: {
    width: 264,
    height: 156,
    backgroundColor: 'transparent',
    borderColor: 'yellow',
    borderWidth: 4,
  }
});

export default Scanner;