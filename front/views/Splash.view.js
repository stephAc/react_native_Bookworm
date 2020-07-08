import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';

import UserService from '../services/user.service';
import Logo from '../assets/img/bookworm_logo.png';
import { BOOKWORM_TOKEN_KEY } from '../config/bookworm.config';
import { user_login } from '../redux/actions/user.action';

const Splash = ({ navigation, user_login }) => {
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
        if (token) {
          const { data } = await UserService.get(token);
          user_login(data.user);
        }
        navigation.replace('Login');
      } catch (err) {
        if (err.response.status === 401) navigation.replace('Login');
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

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { user_login })(Splash);
