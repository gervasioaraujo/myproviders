import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { getProviderById, deleteProvider, cleanState } from '../store/actions/providers';

class ViewProvider extends Component {

    static navigationOptions = {
        title: 'Detalhes do Fornecedor',
    };

    componentDidMount() {
        const { providerId } = this.props.navigation.state.params;
        this.props._getProviderById(providerId)
    }

    _editProviderButtom = () => {
        const { navigation, provider } = this.props;
        const providerId = provider.id;
        navigation.navigate('EditProvider', { providerId });
    }

    _deleteProviderButtom = () => {
        Alert.alert(
            'ATENÇÃO!',
            'Tem certeza que deseja exluir o registro?',
            [
                { text: 'Cancelar', onPress: () => null },
                {
                    text: 'Confirmar', onPress: () => {
                        const { id } = this.props.provider;
                        this.props._deleteProvider(id);

                        // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        // Alert.alert('OK', "Registro excluído do banco!");
                        const { navigation } = this.props;
                        navigation.navigate('ListProviders');
                    }
                },
            ],
            { cancelable: false }
        );
    }

    render() {

        const { provider } = this.props;

        if (!provider) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size={30} />
                </View>
            )
        } else {

            const { id, name, cnpj, fone, address } = provider;

            return (
                <View style={styles.container}>
                    <Text style={styles.providerName}>{name}</Text>
                    <View style={styles.containerData}>
                        <Text style={styles.cnpj}>CNPJ: {cnpj}</Text>
                        <Text style={styles.cnpj}>Telefone: {fone}</Text>
                        <Text style={styles.cnpj}>Endereço: {address}</Text>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity
                            onPress={this._editProviderButtom}
                            style={styles.editProviderButtom}
                        >
                            <Icon name='edit' size={30} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this._deleteProviderButtom}
                            style={styles.deleteProviderButtom}
                        >
                            <Icon name='delete' size={30} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonViewProducts}
                            onPress={() => this.props.navigation.navigate("ListProducts", { providerId: id, providerName: name })}
                        >
                            <Icon name='list' size={30} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>
            );

        }
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    providerName: {
        fontSize: 23,
        color: '#2c3e50',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    containerData: {
        marginTop: 8,
        backgroundColor: '#ecf0f1',
        padding: 6,
        borderRadius: 5
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
    buttonsContainer: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5
    },
    editProviderButtom: {
        backgroundColor: '#2980b9',
        height: 60,
        justifyContent: 'center',
        borderRadius: 15,
        padding: 15,
        marginRight: 5
    },
    deleteProviderButtom: {
        backgroundColor: '#e74c3c',
        height: 60,
        justifyContent: 'center',
        borderRadius: 15,
        padding: 15,
        marginRight: 5
    },
    buttonViewProducts: {
        backgroundColor: '#16a085',
        height: 60,
        justifyContent: 'center',
        borderRadius: 15,
        padding: 15
    },
});

const mapStateToProps = ({ providersReducer }) => {
    return {
        provider: providersReducer.selectedProvider
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _getProviderById: (providerId) => dispatch(getProviderById(providerId)),
        _cleanState: () => dispatch(cleanState()),
        _deleteProvider: (id) => dispatch(deleteProvider(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProvider);