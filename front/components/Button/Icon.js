import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const IconButton = ({ icon, message, handlePress }) => (
    <Icon.Button name={icon} size={24} backgroundColor='#C5AE92' onPress={handlePress}>
        <Text style={styles.text}>
            {message}
        </Text>
    </Icon.Button >
);

const styles = StyleSheet.create({
    text: {
        color: '#FFF',
        fontSize: 16,
        textTransform: 'uppercase',
    }
});

export default IconButton;