import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { deleteProvider, cleanState } from '../store/actions/providers';
import FeedbackMessage from '../components/FeedbackMessage';

class ViewProvider extends Component {

    static navigationOptions = {
        title: 'Detalhes do Fornecedor',
    };

    constructor(props) {
        super(props);
        this.state = {
            provider: null
        }
    }

    didFocus = this.props.navigation.addListener('didFocus', () => {
        this.props._cleanState();
    });

    componentDidMount() {
        this.props._cleanState();
        const { provider } = this.props.navigation.state.params;
        this.setState({ provider });
    }

    _editProviderButtom = () => {
        const { navigation } = this.props;
        const { provider } = this.state;
        navigation.navigate('EditProvider', { provider });
    }

    _deleteProviderButtom = () => {
        Alert.alert(
            'ATENÇÃO!',
            'Tem certeza que deseja exluir o registro?',
            [
                { text: 'Cancelar', onPress: () => null },
                {
                    text: 'Confirmar', onPress: () => {
                        const { provider } = this.state;
                        this.props._deleteProvider(provider.id);
                        Alert.alert('OK', "Registro excluído do banco!");
                        const { navigation } = this.props;
                        navigation.navigate('ListProviders');
                    }
                },
            ],
            { cancelable: false }
        );
    }

    render() {

        const { error, message } = this.props;
        const { provider } = this.state;

        const feedbackMode = error ? "danger" : "success";

        if (!provider) {
            return <ActivityIndicator />
        } else {
            return (
                <View style={styles.container}>
                    {message !== "" && <FeedbackMessage mode={feedbackMode} message={message} />}
                    <Text style={styles.providerName}>{provider.name}</Text>
                    <View style={styles.containerData}>
                        <Text style={styles.cnpj}>CNPJ: {provider.cnpj}</Text>
                        <Text style={styles.cnpj}>Telefone: {provider.fone}</Text>
                        <Text style={styles.cnpj}>Endereço: {provider.address}</Text>
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
                            onPress={() => this.props.navigation.navigate("ListProducts", { provider })}
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
        provider: providersReducer.provider,
        error: providersReducer.error,
        message: providersReducer.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _cleanState: () => dispatch(cleanState()),
        _deleteProvider: (id) => dispatch(deleteProvider(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProvider);