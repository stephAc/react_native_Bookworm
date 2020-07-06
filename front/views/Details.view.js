import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import IconButton from '../components/Button/Icon';
import BookService from '../services/book.service';

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

  const user = navigation.state.params.user;
  const addToLibrary = async () => {
    await BookService.addToLibrary(user.session_token, user._id, {
      author: book.authors[0],
      title: book.title,
      cover: book.imageLinks.thumbnail,
      category: book.categories[0],
      google_link: item.selfLink
    });
  }

  const item = results.items[0];
  const book = item.volumeInfo;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.authors[0]}</Text>
      </View>

      <View style={styles.body}>
        {book.imageLinks &&
          <Image
            source={{ uri: book.imageLinks.thumbnail }}
            style={styles.cover}
            resizeMode='contain'
          />
        }
        <View>
          <Text>no. stars</Text>
          <Text>no. reviews</Text>
          <Text>{book.pageCount} pages</Text>
          <Text>{book.publishedDate}</Text>
        </View>
      </View>

      <IconButton
        icon='book-plus'
        message="Ajouter à votre bibliothèque"
        handlePress={addToLibrary}
      />

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