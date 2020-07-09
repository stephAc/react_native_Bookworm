import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StarRating = ({ isForm, handleRating, score }) => {
  const [newRating, setNewRating] = useState(null);
  return (
    <View style={{ flexDirection: 'row' }}>
      {[...Array(5)].map((star, index) => {
        const starRating = index + 1;
        if (isForm) return (
          <TouchableOpacity
            onPress={() => {
              setNewRating(starRating);
              handleRating(starRating)
            }
            }
            key={index}
          >
            <Icon name='star' size={48} color={starRating <= newRating ? '#19A94C' : '#C0C0C0'} />
          </TouchableOpacity>
        );
        else return (
          <Icon name='star' size={16} color={starRating <= score ? '#19A94C' : '#C0C0C0'} />
        )
      })}
    </View>
  )
};

export default StarRating;