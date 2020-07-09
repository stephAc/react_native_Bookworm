import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import BookService from '../../services/book.service';
import StarRating from './Star';
import FormRating from './Form';

const ListRating = ({ userId, bookId }) => {
  const [comments, setComments] = useState([]);
  const [hasComment, setHasComment] = useState(true);
  const getCommentList = async () => {
    if (bookId) {
      const { data } = await BookService.fetchComments(bookId);
      setComments(data);
      setHasComment(data.some(comment => comment.author._id === userId));
    } else {
      setHasComment(false);
    }
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <View style={styles.container}>
      {bookId && !hasComment && <FormRating bookId={bookId} handlePublish={getCommentList} />}
      {comments.map(comment => <Comment key={comment._id} {...comment} />)}
    </View>
  )
};

const Comment = ({ author, createdAt, rating, opinion }) => (
  <View>
    {/* {author.image && <Image source={} />} */}
    <Text>{author.username}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <StarRating isForm={false} score={rating} />
      <Text>{createdAt}</Text>
    </View>
    <Text>{opinion}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ListRating;