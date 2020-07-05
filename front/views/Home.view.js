import React from 'react';
import { View, Text, FlatList, StyleSheet, } from 'react-native';

import BookThumbnail from '../components/Book/Thumbnail';
import Separator from '../components/Separator';
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

const Home = (props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        horizontal={false}
        numColumns={3}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={Separator}
        renderItem={({ item }) => <BookThumbnail {...item} />}
        keyExtractor={item => item.id}
      />
      <ScanButton {...props} />
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

export default Home;