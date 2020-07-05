import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const BookThumbnail = ({ id, cover, author, title, category, google_link, itemAdder }) => {
  return (
    cover
      ? <View style={styles.coverShadow}>
        <Image source={{ uri: cover }} style={styles.cover} resizeMode='contain' />
      </View>
      : <View style={[styles.cover, styles.coverShadow, styles.noCover]}>
        <Text style={styles.text}>{author}</Text>
        <Text style={styles.text}>{title}</Text>
      </View>
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