import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import { createProvider, updateProvider } from '../store/actions/providers';
import FeedbackMessage from '../components/FeedbackMessage';

class ProviderForm extends Component {

    static navigationOptions = {
        title: 'Adicionar Fornecedor'
    };

    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            cnpj: '',
            fone: '',
            address: '',
            mode: null
        }
    }

    componentDidMount() {
        const { mode } = this.props;
        if (mode === "create") {
            this.setState({ mode });
        } else if (mode === "update") {
            const { id, name, cnpj, fone, address } = this.props.provider;
            this.setState({ mode, id, name, cnpj, fone, address });
        }
    }

    // componentWillUnmount(){

    // }

    _saveProvider = () => {
        const { mode, id, name, cnpj, fone, address } = this.state;
        if (!name || !cnpj || !fone || !address) {
            Alert.alert('Atenção', 'Todos os campos são de preenchimento obrigatório!');
            return;
        }
        const data = { id, name, cnpj, fone, address }
        if (mode === "create") {
            this.props._createProvider(data);
        } else if (mode === "update") {
            this.props._updateProvider(data);
        }
    }

    render() {

        const { error, message } = this.props;
        const { name, cnpj, fone, address, mode } = this.state;

        const feedbackMode = error ? "danger" : "success";

        return (
            <View style={styles.container}>
                {message !== "" && <FeedbackMessage mode={feedbackMode} message={message} />}
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={(text) => this.setState({ name: text })}
                />
                <Text style={styles.label}>CNPJ:</Text>
                <TextInput
                    style={styles.textInput}
                    value={cnpj}
                    onChangeText={(text) => this.setState({ cnpj: text })}
                />
                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                    style={styles.textInput}
                    value={fone}
                    onChangeText={(text) => this.setState({ fone: text })}
                />
                <Text style={styles.label}>Endereço:</Text>
                <TextInput
                    style={styles.textInput}
                    value={address}
                    onChangeText={(text) => this.setState({ address: text })}
                />
                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={() => this._saveProvider()}
                >
                    <Text style={styles.textButton}>SALVAR</Text>
                </TouchableOpacity>
            </View >
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center'
    },
    label: {
        fontSize: 12,
    },
    textInput: {
        fontSize: 18,
        backgroundColor: '#ecf0f1',
        marginBottom: 5
    },
    buttonSave: {
        marginTop: 8,
        backgroundColor: '#27ae60',
        padding: 6,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
        alignSelf: 'center'
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    },
});

const mapStateToProps = ({ providersReducer }) => {
    return {
        error: providersReducer.error,
        message: providersReducer.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _createProvider: (data) => dispatch(createProvider(data)),
        _updateProvider: (data) => dispatch(updateProvider(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderForm);