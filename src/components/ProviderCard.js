import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

class ProviderCard extends Component {

    render() {

        const { provider, navigation } = this.props;

        return (
            <TouchableOpacity onPress={() => navigation.navigate('ViewProvider', { provider })}>
                <View style={styles.appContainer}>
                    <Text style={styles.providerName}>{provider.name}</Text>
                    <Text style={styles.providerCNPJ}>CNPJ: {provider.cnpj}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        margin: 3,
        borderRadius: 5,
    },
    providerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    providerCNPJ: {
        fontSize: 11,
    }
});

export default ProviderCard;