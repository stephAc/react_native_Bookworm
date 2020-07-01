import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

import Logo from '../assets/img/bookworm_logo.png';

const Splash = ({ navigation }) => {
  const [fade, setFade] = useState(new Animated.Value(0));

  const fadeInAnimation = () => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 1500,
    }).start(() => fadeOutAnimation());
  };

  const fadeOutAnimation = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 1500,
    }).start(() => navigation.navigate('Login'));
  };

  useEffect(() => {
    fadeInAnimation();
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
