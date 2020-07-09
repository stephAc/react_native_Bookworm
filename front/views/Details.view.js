import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import { connect } from 'react-redux';
import { user_add_library, user_remove_library } from '../redux/actions/user.action';

import BookService from '../services/book.service';

import ListRating from '../components/Rating/List';

import IconButton from '../components/Button/Icon';

const Details = ({ navigation, user, user_add_library, user_remove_library }) => {
  const results = navigation.state.params.data;
  if (results.totalItems === 0) {
    return (
      <View style={styles.noInfo}>
        <Text style={{ fontSize: 48 }}>⊜_⊜</Text>
        <Text>Aucune information disponible en ligne</Text>
      </View>
    );
  }

  const [hasBook, setHasBook] = useState(false);
  const checkOwned = () => {
    if (item) setHasBook(user.book.some(b =>
      b.google_link === item.selfLink
    ));
    else setHasBook(user.book.some(b =>
      b.google_link === results.selfLink
    ));
  };

  useEffect(() => {
    checkOwned();
  }, []);

  const manageLibrary = async () => {
    if (!hasBook) {
      const { data } = await BookService.addToLibrary(user.session_token, user._id, {
        author: bookDetails.authors[0],
        title: bookDetails.title,
        cover: bookDetails.imageLinks.thumbnail,
        category: bookDetails.categories[0],
        google_link: item ? item.selfLink : results.selfLink
      });
      await user_add_library(data);
      setHasBook(true);
    } else {
      await BookService.removeFromLibrary(user.session_token, user._id, bookThumbnail[0]._id);
      await user_remove_library(bookThumbnail[0]._id);
      setHasBook(false);
    }
  };

  const item = results.items ? results.items[0] : null;
  const bookDetails = item ? item.volumeInfo : results.volumeInfo;
  const bookThumbnail = item
    ? user.book.filter(b => b.google_link === item.selfLink)
    : user.book.filter(b => b.google_link === results.selfLink);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.title}>{bookDetails.title}</Text>
        <Text style={styles.author}>{bookDetails.authors[0]}</Text>
      </View>

      <View style={styles.body}>
        {bookDetails.imageLinks &&
          <Image
            source={{ uri: bookDetails.imageLinks.thumbnail }}
            style={styles.cover}
            resizeMode='contain'
          />
        }
        <View>
          <Text>no. stars</Text>
          <Text>no. reviews</Text>
          <Text>{bookDetails.pageCount} pages</Text>
          <Text>{bookDetails.publishedDate}</Text>
        </View>
      </View>

      <IconButton
        icon={!hasBook ? 'book-plus' : 'book-minus'}
        message={!hasBook ? "Ajouter à votre bibliothèque" : "Retirer de votre bibliothèque"}
        handlePress={manageLibrary}
      />

      {bookDetails.description &&
        <Text>{bookDetails.description}</Text>
      }

      <View style={{
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 12,
        marginBottom: 8,
      }} />

      <ListRating
        userId={user._id}
        bookId={bookThumbnail.length > 0 ? bookThumbnail[0]._id : null}
      />
    </ScrollView>
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

const mapStateToProps = (state) => state.user;

export default connect(mapStateToProps, { user_add_library, user_remove_library })(Details);