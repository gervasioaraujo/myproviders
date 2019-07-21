import React, { Component } from 'react';
import ProductForm from '../components/ProductForm';

class NewProduct extends Component {

    static navigationOptions = {
        title: 'Adicionar Produto'
    };

    render() {

        const { providerId, providerName } = this.props.navigation.state.params;

        return (
            <ProductForm
                providerId={providerId}
                providerName={providerName}
            />
        );

    }

}

export default NewProduct;