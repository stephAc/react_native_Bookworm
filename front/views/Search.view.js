import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, } from 'react-native';

import GoogleService from '../services/google.service';

import BookThumbnail from '../components/Book/Thumbnail';
import BookItem from '../components/Book/Item';

import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [resultsByTitle, setResultsByTitle] = useState([]);
  const [resultsByAuthor, setResultsByAuthor] = useState([]);

  const searchBooks = async (text) => {
    if (text.length > 1) {
      await GoogleService.search(text, 5)
        .then(({ data }) => setResults(data.items.filter(item => item.saleInfo.country === 'FR')));

      await GoogleService.searchByTitle(text, 5)
        .then(({ data }) => setResultsByTitle(data.items));

      await GoogleService.searchByAuthor(text, 5)
        .then(({ data }) => setResultsByAuthor(data.items));
    } else {
      setResults([]);
      setResultsByTitle([]);
      setResultsByAuthor([]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Saisissez le titre d'un livre ou un auteur"
          onChangeText={searchBooks}
        />
        <Icon name='search' size={24} />
      </View>

      {results && results.length > 0 &&
        <View>
          <Text>Résultats</Text>
          <FlatList
            data={results}
            horizontal={true}
            renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
            keyExtractor={item => item.id}
          />
        </View>
      }

      {resultsByTitle && resultsByTitle.length > 0 &&
        <View>
          <Text>Résultats par titre</Text>
          <FlatList
            data={resultsByTitle}
            horizontal={true}
            renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
            keyExtractor={item => item.id}
          />
        </View>
      }

      {resultsByAuthor && resultsByAuthor.length > 0 &&
        <View>
          <Text>Résultats par auteur</Text>
          <FlatList
            data={resultsByAuthor}
            horizontal={true}
            renderItem={({ item }) => <BookItem {...item} navigation={navigation} />}
            keyExtractor={item => item.id}
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    // borderColor: 'black',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 48,
    paddingHorizontal: 12,
  }
});

export default Search;