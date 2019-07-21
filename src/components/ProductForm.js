import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import { createProduct, updateProduct } from '../store/actions/products';
import FeedbackMessage from '../components/FeedbackMessage';

class ProductForm extends Component {

    static navigationOptions = {
        title: 'Adicionar Fornecedor'
    };

    constructor(props) {
        super(props);
        this.state = {
            provider: null,
            id: 0,
            name: '',
            price: '',
            mode: null
        }
    }

    componentDidMount() {
        // const { mode, provider } = this.props;
        // if (mode === "create") {
        //     // this.setState({ mode, provider });
        // } else if (mode === "update") {
        //     const { id, name, price } = this.props.product;
        //     this.setState({ mode, provider, id, name, price });
        // }
    }

    _saveProduct = () => {
        let { mode, provider, id, name, price } = this.state;
        if (!name || !price) {
            Alert.alert('Atenção', 'Todos os campos são de preenchimento obrigatório!');
            return;
        }
        try {
            price = parseFloat(price);
        } catch (error) {
            alert("Preço de custo inválido!")
        }
        const data = { providerId: provider.id, id, name, price }
        if (mode === "create") {
            this.props._createProduct(data);
        } else if (mode === "update") {
            this.props._updateProduct(data);
        }
    }

    render() {

        const { providerName, error, message } = this.props;
        const { name, price } = this.state;

        const feedbackMode = error ? "danger" : "success";

        return (
            <View style={styles.container}>
                {message !== "" && <FeedbackMessage mode={feedbackMode} message={message} />}
                <Text style={styles.label}>
                    Fornecedor: <Text style={styles.providerName}>{providerName}</Text>
                </Text>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    // onChangeText={(text) => this.setState({ name: text })}
                />
                <Text style={styles.label}>Preço de custo:</Text>
                <TextInput
                    style={styles.textInput}
                    keyboardType='numeric'
                    value={price.toString()}
                    onChangeText={(text) => this.setState({ price: text })}
                />
                <TouchableOpacity
                    style={styles.buttonSave}
                    onPress={() => this._saveProduct()}
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
    providerName: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
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

const mapStateToProps = ({ productsReducer }) => {
    return {
        error: productsReducer.error,
        message: productsReducer.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _createProduct: (data) => dispatch(createProduct(data)),
        _updateProduct: (data) => dispatch(updateProduct(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);