import React, { useState, useEffect, Fragment } from 'react';
import { Text, View, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';

import FormInput from './FormInput';
import { MAIN_API_URL } from '../../config/url.config';

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

const updateSchema = yup.object({
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
});

const RegisterUpdateForm = ({ submit, user }) => {
  const [image, setImage] = useState(null);

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
  useEffect(() => {
    const URI = !user ? null : `${MAIN_API_URL}${user.image}`;
    setImage(URI);
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={!user ? initValue : user}
      validationSchema={!user ? registerSchema : updateSchema}
      onSubmit={(values) => submit(values, image)}
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
                value={values.firstname}
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
          <Text style={styles.error}>{touched.email && errors.email}</Text>
          {!user && (
            <Fragment>
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
            </Fragment>
          )}

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

          <Button
            title={
              user === null ? "S'inscrire" : 'Enregistrer les modifications'
            }
            onPress={handleSubmit}
          />
        </Fragment>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps)(RegisterUpdateForm);
