import React, { Fragment, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';

import UserService from '../services/user.service';
import FormInput from '../components/FormInput';
import { API_MESSAGE_RESPONSE } from '../config/api.config';
import { user_login } from '../redux/actions/user.action';
import { BOOKWORM_TOKEN_KEY } from '../config/bookworm.config';

const initValue = {
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  password: '',
};

const registerSchema = yup.object({
  firstname: yup
    .string()
    .required('Le prénom est obligatoire')
    .min(4, 'Le prénom doit être de 4 caractères minimum'),
  lastname: yup
    .string()
    .required('Le nom est obligatoire')
    .min(2, 'Le nom doit être de 2 caractères minimum'),
  username: yup.string(),
  email: yup
    .string()
    .email("L'email doit être valid")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .required('Le mot de passe est obligatoire')
    .min(4, 'Mot de passe trop court'),
  confirmedPassword: yup
    .string()
    .required('La confirmation du mot de passe est obligatoire')
    .oneOf([yup.ref('password')], 'Confirmation incorrect'),
});

const Register = ({ navigation, user_login }) => {
  const [image, setImage] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const changeToast = (visible = false, message = '') => {
    setToast((prevState) => ({
      ...prevState,
      visible,
      message,
    }));
  };

  const register = async (values) => {
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

    try {
      const { data } = await UserService.create(formData);
      await SecureStore.setItemAsync(BOOKWORM_TOKEN_KEY, data.session_token);
      user_login(data.user);
      navigation.navigate('Home', { user: data.user });
    } catch (err) {
      if (err.response.status === 400) {
        const { message } = err.response.data;
        if (message in API_MESSAGE_RESPONSE)
          changeToast(true, API_MESSAGE_RESPONSE[message]);
      }
    }
  };

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Désolé, nous avons besoin de la permission pour fonctionner');
    } else {
      pickImage();
    }
  };

  const pickImage = async () => {
    try {
      let { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!cancelled) setImage(uri);
    } catch (err) {
      console.log(err);
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
          <Formik
            initialValues={initValue}
            validationSchema={registerSchema}
            onSubmit={(values) => register(values)}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              handleBlur,
              touched,
              errors,
            }) => (
              <Fragment>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <FormInput
                      name="firstname"
                      value={values.name}
                      onChangeText={handleChange('firstname')}
                      placeholder="Prénom"
                      iconName="md-person"
                      iconColor="#2C384A"
                      onBlur={handleBlur('firstname')}
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <FormInput
                      name="lastname"
                      value={values.lastname}
                      onChangeText={handleChange('lastname')}
                      placeholder="Nom"
                      iconName="md-person"
                      iconColor="#2C384A"
                      onBlur={handleBlur('lastname')}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.error}>
                    {touched.firstname && errors.firstname}
                    {'\n'}
                    {touched.lastname && errors.lastname}
                  </Text>
                </View>
                <FormInput
                  name="username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  placeholder="Nom d'utilisateur"
                  iconName="md-person"
                  iconColor="#2C384A"
                  onBlur={handleBlur('username')}
                />
                <Text style={styles.error}>
                  {touched.username && errors.username}
                </Text>
                <FormInput
                  name="email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder="Email"
                  iconName="md-mail"
                  iconColor="#2C384A"
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
                  iconColor="#2C384A"
                  secureTextEntry
                  onBlur={handleBlur('password')}
                />
                <Text style={styles.error}>
                  {touched.password && errors.password}
                </Text>
                <FormInput
                  name="confirmedPassword"
                  value={values.confirmedPassword}
                  onChangeText={handleChange('confirmedPassword')}
                  placeholder="Confirmer le mot de passe"
                  iconName="md-lock"
                  iconColor="#2C384A"
                  secureTextEntry
                  onBlur={handleBlur('confirmedPassword')}
                />
                <Text style={styles.error}>
                  {touched.confirmedPassword && errors.confirmedPassword}
                </Text>

                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}
                >
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 200, height: 200 }}
                    />
                  )}
                </View>
                <View style={{ flex: 1, marginVertical: 10 }}>
                  <Button
                    title="Ajouter une image"
                    color="#19A94C"
                    onPress={getPermissionAsync}
                  />
                </View>

                <Button title="S'inscrire" onPress={handleSubmit} />
              </Fragment>
            )}
          </Formik>
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
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  redirectionText: {
    marginTop: 10,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { user_login })(Register);
