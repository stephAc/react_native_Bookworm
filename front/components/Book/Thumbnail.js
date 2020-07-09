import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

import GoogleService from '../../services/google.service';

const BookThumbnail = ({ navigation, id, cover, author, title, category, google_link }) => {
  const [book, setBook] = useState({});
  const fetchData = async () => {
    const { data } = await GoogleService.get(google_link);
    setBook(data);
  }

  useEffect(() => {
    fetchData();
  }, [google_link]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Details', { data: book })}>
      {cover
        ? <View style={styles.coverShadow}>
          <Image source={{ uri: cover }} style={styles.cover} resizeMode='contain' />
        </View>
        : <View style={[styles.cover, styles.coverShadow, styles.noCover]}>
          <Text style={styles.text}>{author}</Text>
          <Text style={styles.text}>{title}</Text>
        </View>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cover: {
    height: 150,
    width: 90,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  noCover: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderColor: 'black',
    borderWidth: 1
  },
  coverShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 15,
    shadowOpacity: 0.25
  },
  text: {
    fontSize: 12,
    // fontWeight: 'bold'
  }
});

export default BookThumbnail;