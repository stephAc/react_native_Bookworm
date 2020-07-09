import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';

import UserService from '../services/user.service';
import { API_MESSAGE_RESPONSE } from '../config/api.config';
import { user_login } from '../redux/actions/user.action';
import { BOOKWORM_TOKEN_KEY } from '../config/bookworm.config';
import RegisterUpdateForm from '../components/Form/RegisterUpdateForm';

const Register = ({ navigation, user_login }) => {
  const [toast, setToast] = useState({ visible: false, message: '' });

  const changeToast = (visible = false, message = '') => {
    setToast((prevState) => ({
      ...prevState,
      visible,
      message,
    }));
  };

  const createFormData = (values, image) => {
    let formData = new FormData();
    values['email'] = values['email'].toLowerCase();
    if (image) {
      formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: 'profil.jpg',
      });
    }
    for (let key in values) {
      formData.append(key, values[key]);
    }
    return formData;
  };

  const register = async (values, image) => {
    const formData = createFormData(values, image);
    try {
      const { data } = await UserService.create(formData);
      await SecureStore.setItemAsync(BOOKWORM_TOKEN_KEY, data.session_token);
      user_login(data.user);
      navigation.replace('Home');
    } catch (err) {
      if (err.response.status === 400) {
        const { message } = err.response.data;
        if (message in API_MESSAGE_RESPONSE)
          changeToast(true, API_MESSAGE_RESPONSE[message]);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Toast
            visible={toast.visible}
            position={Toast.positions.CENTER}
            backgroundColor="#FF2C2C"
            shadow={true}
            animation={true}
            hideOnPress={true}
            onHide={() => changeToast(false)}
          >
            {toast.message}
          </Toast>
          <RegisterUpdateForm submit={register} />
          <Text style={styles.redirectionText}>
            Déjà un compte ?{' '}
            <Text
              style={{ color: 'blue' }}
              onPress={() => navigation.navigate('Login')}
            >
              Se connecter
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 50,
    flexGrow: 1,
    justifyContent: 'center',
  },
  redirectionText: {
    marginTop: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { user_login })(Register);
