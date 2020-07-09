import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import BookService from '../../services/book.service';

import StarRating from './Star';
import IconButton from '../Button/Icon';

const FormRating = ({ user, bookId, handlePublish }) => {
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState(null);

    const publishComment = async () => {
        await BookService.publishComment(user.session_token, user._id, bookId, rating, comment)
            .then(({ data }) => handlePublish());
    }

    return (
        <View>
            <StarRating isForm={true} handleRating={(newRating) => setRating(newRating)} />
            <TextInput
                placeholder="Décrivez votre avis sur le livre"
                onChangeText={(text) => setComment(text)}
                style={styles.input}
            />
            <IconButton
                icon='publish'
                message="Publier"
                handlePress={publishComment}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        borderColor: '#C0C0C0',
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 4,
        paddingHorizontal: 8
    }
});

const mapStateToProps = (state) => state.user;

export default connect(mapStateToProps)(FormRating);