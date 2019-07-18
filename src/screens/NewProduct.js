import React, { Component } from 'react';
import ProductForm from '../components/ProductForm';

class NewProduct extends Component {

    static navigationOptions = {
        title: 'Adicionar Produto'
    };

    render() {
        const { provider } = this.props.navigation.state.params;
        return (
            <ProductForm mode="create" provider={provider} />
        );
    }

}

export default NewProduct;