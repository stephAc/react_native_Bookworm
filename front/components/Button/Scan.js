import React from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';

import { Camera } from 'expo-camera';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ScanButton = ({ navigation }) => {
  const askPermission = async () => {
    // { "canAskAgain": true, "expires": "never", "granted": false, "status": "denied" }
    // { "canAskAgain": true, "expires": "never", "granted": true, "status": "granted" }
    const { status } = await Camera.requestPermissionsAsync();
    status === 'granted'
      ? navigation.navigate('Scanner')
      : Alert.alert(
        "Autorisation refusée ಥ_ಥ",
        "Vous nous avez refusé l'accès à votre appareil photo ಠಿ_ಠ\n"
        + "Nous en avons besoin pour scanner les codes barres de vos livres préférés.\n"
        + "Voulez-vous nous autoriser ?",
        [
          { text: "Nop", style: "cancel" },
          { text: "Oui", onPress: () => navigation.navigate('Scanner') }
        ]
      );
  }

  return (
    <TouchableWithoutFeedback onPress={askPermission}>
      <View style={styles.floatingButton}>
        <Icon name={'qrcode-scan'} size={24} color={'#FFF'} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: '#C5AE92',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 10,
    shadowOpacity: 0.3,
    elevation: 5
  }
});

export default ScanButton;