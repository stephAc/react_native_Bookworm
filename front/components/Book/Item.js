import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const BookItem = (props) => {
  const book = props.volumeInfo;
  // console.log(book)
  return (
    <View style={styles.item}>
      {book.imageLinks &&
        <Image
          source={{ uri: book.imageLinks.thumbnail }}
          style={styles.cover}
          resizeMode='contain'
        />
      }
      <View>
        <Text style={styles.text}>{book.title}</Text>
        <Text style={styles.text}>{book.authors[0]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 120,
    width: 216,
    marginLeft: 12,
    marginVertical: 12,
    flexDirection: 'row',
    // padding: 4,
    // borderColor: 'black',
    // borderWidth: 1,
    borderTopEndRadius: 12,
    borderBottomEndRadius: 12,
    backgroundColor: '#FFF'
  },
  cover: {
    height: 120,
    width: 72
  },
  text: {
    margin: 4
  }
});

export default BookItem;