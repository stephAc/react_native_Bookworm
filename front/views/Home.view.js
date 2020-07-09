import React, { useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, } from 'react-native';
import { useFocusEffect } from 'react-navigation-hooks';

import * as SecureStore from 'expo-secure-store';
import { BOOKWORM_TOKEN_KEY } from '../config/bookworm.config';
import UserService from '../services/user.service';
import { connect } from 'react-redux';
import { user_login } from '../redux/actions/user.action';

import BookThumbnail from '../components/Book/Thumbnail';
import BookShelf from '../components/Book/Shelf';
import ScanButton from '../components/Button/Scan';

const books = [
  {
    id: '1',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/518VRMR9SDL._SX303_BO1,204,203,200_.jpg',
    author: 'Pierre Boulle',
    title: 'La planète des singes'
  },
  {
    id: '2',
    cover: 'https://lh3.googleusercontent.com/proxy/jhEtL--zAqAm7Ooei5GLB041WPUFAebBOBnG3D2iHvu2wWthWzl_1vRTiR5cEROnJKv6jw0TvCE_pLWdFHgIDiq6DOzKAMnnmNtKOh5qmufM4_by14aag_ajZg',
    author: 'George Orwell',
    title: 'La ferme des animaux'
  },
  {
    id: '3',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/81MG-67hRTL.jpg',
    author: 'John Steinbeck',
    title: 'Des souris et des hommes'
  },
  {
    id: '4',
    cover: 'https://lh3.googleusercontent.com/proxy/c7BKnoVUeAk5TRJAfPmg_PwXVPmrprTKn3L_uklfoCqzcNJjM-hu71ExDPj2OY4aQlPM-xLxGp3G78uoYtmWGDwDo2hzkfUDJsCGD_HQfGC0-MwV9OsHGlm2IQ',
    author: 'Albert Camus',
    title: "L'étranger"
  },
];

const Home = ({ navigation, user }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={user.book}
        horizontal={false}
        numColumns={3}
        ItemSeparatorComponent={BookShelf}
        ListFooterComponent={BookShelf}
        renderItem={({ item }) => <BookThumbnail {...item} navigation={navigation} />}
        keyExtractor={item => item.id}
      />
      <ScanButton navigation={navigation} />
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

const mapStateToProps = (state) => state.user;

export default connect(mapStateToProps, { user_login })(Home);