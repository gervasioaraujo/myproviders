import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import { cleanProviderFormFeedbackMessage } from '../store/actions/providers';
import {
    changeProviderFormName,
    changeProviderFormCNPJ,
    changeProviderFormFone,
    changeProviderFormAddress,
    createProvider,
    updateProvider
} from '../store/actions/providers';
import FeedbackMessage from '../components/FeedbackMessage';

class ProviderForm extends Component {

    componentDidMount() {
        this.props._cleanProviderFormFeedbackMessage();
    }

    _onProviderNameChange = (name) => {
        this.props._cleanProviderFormFeedbackMessage();
        this.props._changeProviderFormName(name);
    }

    _onProviderCNPJChange = (cnpj) => {
        this.props._cleanProviderFormFeedbackMessage();
        this.props._changeProviderFormCNPJ(cnpj);
    }

    _onProviderFoneChange = (fone) => {
        this.props._cleanProviderFormFeedbackMessage();
        this.props._changeProviderFormFone(fone);
    }

    _onProviderAddressChange = (address) => {
        this.props._cleanProviderFormFeedbackMessage();
        this.props._changeProviderFormAddress(address);
    }

    _saveProvider = () => {

        const { id, name, cnpj, fone, address } = this.props;

        if (!name || !cnpj || !fone || !address) {
            Alert.alert('Atenção', 'Todos os campos são de preenchimento obrigatório!');
            return;
        }

        const data = { id, name, cnpj, fone, address };

        if (!id) {
            this.props._createProvider(data);
        } else {
            this.props._updateProvider(data);
        }

    }

    render() {

        const { name, cnpj, fone, address, error, message } = this.props;

        const feedbackMode = error ? "danger" : "success";

        return (
            <View style={styles.container}>
                {message !== "" && <FeedbackMessage mode={feedbackMode} message={message} />}
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={(text) => this._onProviderNameChange(text)}
                />
                <Text style={styles.label}>CNPJ:</Text>
                <TextInput
                    style={styles.textInput}
                    value={cnpj}
                    onChangeText={(text) => this._onProviderCNPJChange(text)}
                />
                <Text style={styles.label}>Telefone:</Text>
                <TextInput
                    style={styles.textInput}
                    value={fone}
                    onChangeText={(text) => this._onProviderFoneChange(text)}
                />
                <Text style={styles.label}>Endereço:</Text>
                <TextInput
                    style={styles.textInput}
                    value={address}
                    onChangeText={(text) => this._onProviderAddressChange(text)}
                // multiline
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

const mapStateToProps = ({ providerFormReducer }) => {
    const { name, cnpj, fone, address, error, message } = providerFormReducer;
    return { name, cnpj, fone, address, error, message };
}

const mapDispatchToProps = dispatch => {
    return {
        _changeProviderFormName: (name) => dispatch(changeProviderFormName(name)),
        _changeProviderFormCNPJ: (cnpj) => dispatch(changeProviderFormCNPJ(cnpj)),
        _changeProviderFormFone: (fone) => dispatch(changeProviderFormFone(fone)),
        _changeProviderFormAddress: (address) => dispatch(changeProviderFormAddress(address)),
        _createProvider: (data) => dispatch(createProvider(data)),
        _updateProvider: (data) => dispatch(updateProvider(data)),
        _cleanProviderFormFeedbackMessage: () => dispatch(cleanProviderFormFeedbackMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderForm);