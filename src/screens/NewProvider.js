import React, { Component } from 'react';
import ProviderForm from '../components/ProviderForm';

class NewProvider extends Component {

    static navigationOptions = {
        title: 'Adicionar Fornecedor'
    };

    render() {
        return (
            <ProviderForm />
        );
    }

}

export default NewProvider;