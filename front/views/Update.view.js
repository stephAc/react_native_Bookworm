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
import { connect } from 'react-redux';

import UserService from '../services/user.service';
import { user_login } from '../redux/actions/user.action';
import RegisterUpdateForm from '../components/Form/RegisterUpdateForm';

const Update = ({ navigation, user, user_login }) => {
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
    if ('email' in values) values['email'] = values['email'].toLowerCase();
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

  const updateUser = async (values, image) => {
    const formData = createFormData(values, image);
    // console.log('update');
    // console.log('update image', image);

    try {
      const { data } = await UserService.update(
        user._id,
        user.session_token,
        formData,
      );
      console.log('After update');
      user_login(data.user);
      navigation.navigate('Profil');
    } catch (err) {
      console.log(err);
      if (!err.response) {
        const updatedUser = await UserService.get(user.session_token);
        console.log(updatedUser.data.user);
        navigation.navigate('Profil');
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
          <RegisterUpdateForm submit={updateUser} />
          <Text
            style={styles.redirectionText}
            onPress={() => navigation.navigate('Profil')}
          >
            Quitter la modification
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
    color: 'blue',
  },
});

const mapStateToProps = (state) => {
  return { user: state.user.user };
};

export default connect(mapStateToProps, { user_login })(Update);
