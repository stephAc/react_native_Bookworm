import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import UserService from '../services/user.service';
import Logo from '../assets/img/bookworm_logo.png';
import { BOOKWORM_TOKEN_KEY } from '../config/bookworm.config';

const Splash = ({ navigation }) => {
  const [fade, setFade] = useState(new Animated.Value(0));

  const fadeInAnimation = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1500,
    }).start(fadeOutAnimation);
  };

  const fadeOutAnimation = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 1500,
    }).start(fadeInAnimation);
  };

  const checkForToken = () => {
    setTimeout(async () => {
      try {
        const token = await SecureStore.getItemAsync(BOOKWORM_TOKEN_KEY);
        if (!token) navigation.navigate('Login', { user: null });

        const { data } = await UserService.get(token);
        navigation.navigate('Login', { user: data.user });
      } catch (err) {
        if (err.response.status === 401)
          navigation.navigate('Login', { user: null });
      }
    }, 2000);
  };

  useEffect(() => {
    fadeInAnimation();
    checkForToken();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image style={{ opacity: fade }} source={Logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
