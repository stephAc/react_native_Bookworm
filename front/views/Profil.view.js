import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import { MAIN_API_URL } from '../config/url.config';
import { BOOKWORM_TOKEN_KEY } from '../config/bookworm.config';
import { user_logout } from '../redux/actions/user.action';
import FormInput from '../components/Form/FormInput';
import UserService from '../services/user.service';

const Profil = ({ navigation, user, user_logout }) => {
  const [uri, setUri] = useState(`${MAIN_API_URL}no_image_1592837773156.png`);

  const logout = async () => {
    await SecureStore.deleteItemAsync(BOOKWORM_TOKEN_KEY);
    navigation.navigate('Login');
    user_logout();
  };

  const deleteUser = async () => {
    try {
      await UserService.delete(user._id, user.session_token);
      await SecureStore.deleteItemAsync(BOOKWORM_TOKEN_KEY);
      navigation.navigate('Login');
      user_logout();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const confirmDeleteUser = () => {
    Alert.alert(
      'Suppression',
      'Etes-vous sûr de vouloir supprimer votre compte ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: deleteUser },
      ],
      { cancelable: false },
    );
  };

  useEffect(() => {
    if (user) {
      const URI =
        user.image === ''
          ? `${MAIN_API_URL}public/img/no_image_1592837773156.png`
          : `${MAIN_API_URL}${user.image}`;

      setUri(URI);
    }
  }, [user]);

  if (!user) {
    return null;
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            marginTop: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 10,
            marginLeft: 25,
          }}
        >
          <Icon
            name="power-off"
            type="font-awesome"
            color="white"
            onPress={logout}
          />
          <Icon
            raised
            name="pencil"
            type="font-awesome"
            color="#21dc53"
            onPress={() => navigation.navigate('Update')}
          />
        </View>
        <View style={styles.profilContainer}>
          <View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <Image style={styles.avatar} source={{ uri }} />
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
                  {user.username}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginRight: 50,
                }}
              >
                <Icon
                  name="book"
                  type="font-awesome"
                  color="#21dc53"
                  size={120}
                  onPress={() => console.log('hello')}
                />
                <Text
                  style={{ fontWeight: 'bold', fontSize: 50, color: '#21dc53' }}
                >
                  {user.book.length}
                </Text>
              </View>
            </View>
            <View style={{ marginTop: 50 }}>
              <FormInput
                name="firstname"
                value={user.firstname}
                placeholder="Prénom"
                iconName="md-person"
                iconColor="#19A94C"
                disabled
              />
              <FormInput
                name="lastname"
                value={user.lastname}
                placeholder="Nom"
                iconName="md-person"
                iconColor="#19A94C"
                disabled
              />
              <FormInput
                name="email"
                value={user.email}
                placeholder="Email"
                iconName="md-mail"
                iconColor="#19A94C"
                disabled
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Button title="Supprimer son compte" onPress={confirmDeleteUser} />
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21dc53',
  },
  profilContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    marginTop: 20,
    borderTopEndRadius: 100,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
});

const mapStateTopProps = (state) => {
  return { user: state.user.user };
};
export default connect(mapStateTopProps, { user_logout })(Profil);
