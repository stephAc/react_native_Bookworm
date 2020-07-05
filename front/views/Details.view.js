import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import IconButton from '../components/Button/Icon';

const Details = ({ navigation }) => {
  const results = navigation.state.params.data;
  if (results.totalItems === 0) {
    return (
      <View style={styles.noInfo}>
        <Text style={{ fontSize: 48 }}>⊜_⊜</Text>
        <Text>Aucune information disponible en ligne</Text>
      </View>
    );
  }

  const book = results.items[0];
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{book.volumeInfo.title}</Text>
        <Text style={styles.author}>{book.volumeInfo.authors[0]}</Text>
      </View>

      <View style={styles.body}>
        {book.volumeInfo.imageLinks &&
          <Image
            source={{ uri: book.volumeInfo.imageLinks.thumbnail }}
            style={styles.cover}
            resizeMode='contain'
          />
        }
        <View>
          <Text>no. stars</Text>
          <Text>no. reviews</Text>
          <Text>{book.volumeInfo.pageCount} pages</Text>
          <Text>{book.volumeInfo.publishedDate}</Text>
        </View>
      </View>

      <IconButton icon='book-plus' message="Ajouter à votre bibliothèque" />

      {/* {book.volumeInfo.description &&
        <Text>{book.volumeInfo.description}</Text>
      } */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    padding: 12,
  },
  noInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
  },
  author: {
    paddingBottom: 8,
  },
  body: {
    flexDirection: 'row',
    marginBottom: 12
  },
  cover: {
    height: 216,
    width: 132,
    marginRight: 12
  }
});

export default Details;