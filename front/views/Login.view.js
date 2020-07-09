import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  View,
  StyleSheet,
  Button,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-root-toast';
import { connect } from 'react-redux';

import UserService from '../services/user.service';
import FormInput from '../components/FormInput';
import LoginLogo from '../assets/img/login_logo.png';
import Background from '../assets/img/login_background.png';
import { BOOKWORM_TOKEN_KEY } from '../config/bookworm.config';
import { API_MESSAGE_RESPONSE } from '../config/api.config';
import { user_login } from '../redux/actions/user.action';

const initValue = {
  email: '',
  password: '',
  rememberMe: false,
};

const loginSchema = yup.object({
  email: yup
    .string()
    .email("L'email doit être valid")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .required('Le mot de passe est obligatoire')
    .min(4, 'Mot de passe trop court'),
});

const Login = ({ navigation, user_login }) => {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [switchBtn, setSwitchBtn] = useState(false);
  const toggleSwitch = () => setSwitchBtn((previousState) => !previousState);

  const changeToast = (visible = false, message = '') => {
    setToast((prevState) => ({
      ...prevState,
      visible,
      message,
    }));
  };

  const login = async (credentials) => {
    try {
      const { data } = await UserService.login(credentials);
      if (switchBtn)
        await SecureStore.setItemAsync(BOOKWORM_TOKEN_KEY, data.session_token);
      user_login(data.user);
      navigation.navigate('Home');
    } catch (err) {
      if (err.response.status === 400) {
        const { message } = err.response.data;
        if (message in API_MESSAGE_RESPONSE)
          changeToast(true, API_MESSAGE_RESPONSE[message]);
      }
    }
  };

  const disconnectUser = async () => {
    setUser(null);
    await SecureStore.deleteItemAsync(BOOKWORM_TOKEN_KEY);
  };

  useEffect(() => {
    const { user } = navigation.state.params;
    console.log('Login page', user);
    setUser(user);
    user !== null && user_login(user);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loginLogo}>
        <Image source={LoginLogo} style={{ width: 150, height: 150 }} />
      </View>
      {user === null && (
        <ImageBackground
          style={[styles.fixed, { zIndex: -1 }]}
          source={Background}
        />
      )}
      {user !== null ? (
        <View>
          <TouchableOpacity
            style={styles.userLogBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.userLogBtnText}>
              Continuer en tant que {user.username}
            </Text>
          </TouchableOpacity>
          <Text
            style={[styles.redirectionText, { color: 'blue' }]}
            onPress={disconnectUser}
          >
            Changer d'utilisateur
          </Text>
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Toast
              visible={toast.visible}
              position={100}
              backgroundColor="#FF2C2C"
              shadow={true}
              animation={true}
              hideOnPress={true}
              onHide={() => changeToast(false)}
            >
              {toast.message}
            </Toast>

            <Formik
              initialValues={initValue}
              validationSchema={loginSchema}
              onSubmit={(values) => login(values)}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
              }) => (
                <View>
                  <FormInput
                    name="email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Email"
                    iconName="md-mail"
                    iconColor="#19A94C"
                    autoCapitalize="none"
                    onBlur={handleBlur('email')}
                  />
                  <Text style={styles.error}>
                    {touched.email && errors.email}
                  </Text>
                  <FormInput
                    name="password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Mot de passe"
                    iconName="md-lock"
                    iconColor="#19A94C"
                    secureTextEntry
                    onBlur={handleBlur('password')}
                  />
                  <Text style={styles.error}>
                    {touched.password && errors.password}
                  </Text>
                  <View style={styles.switchStyle}>
                    <Text>Se souvenir de moi {switchBtn ? '!' : '?'} </Text>
                    <Switch
                      trackColor={{ false: 'white', true: 'orange' }}
                      thumbColor={switchBtn ? 'red' : 'white'}
                      ios_backgroundColor="white"
                      onValueChange={toggleSwitch}
                      value={switchBtn}
                    />
                  </View>
                  <Button title="Se connecter" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
            <Text style={styles.redirectionText}>
              Pas de compte ?{' '}
              <Text
                style={{ color: 'blue' }}
                onPress={() => navigation.navigate('Register')}
              >
                S'enregistrer
              </Text>
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  loginLogo: {
    marginBottom: 50,
    alignItems: 'center',
  },
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchStyle: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  redirectionText: {
    marginTop: 10,
    textAlign: 'center',
  },
  fixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  userLogBtn: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 2,
    paddingVertical: 10,
  },
  userLogBtnText: {
    fontWeight: 'bold',
    alignSelf: 'stretch',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { user_login })(Login);
