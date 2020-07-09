import React from 'react';
import { View, StyleSheet } from 'react-native';

const BookShelf = () => (
  <View style={styles.shelf} />
);

const styles = StyleSheet.create({
  shelf: {
    height: 10,
    backgroundColor: '#C5AE92',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowRadius: 6,
    shadowOpacity: 0.25
  }
});

export default BookShelf;