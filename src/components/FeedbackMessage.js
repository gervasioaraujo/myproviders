import React from 'react';
import { StyleSheet, Text } from 'react-native';

const FeedbackMessage = (props) => {

    const { mode, message } = props;

    return (
        <Text style={[styles[mode], styles.message]}>{message}</Text>
    );
}

const styles = StyleSheet.create({
    message: {
        margin: 10,
        borderRadius: 5,
        padding: 10,
        textAlign: 'center'
    },
    danger: {
        color: '#d63031',
        backgroundColor: '#fab1a0',
    },
    success: {
        color: '#218c74',
        backgroundColor: '#1dd1a1',
    }
});

export default FeedbackMessage;