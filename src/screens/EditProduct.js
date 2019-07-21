import React, { Component } from 'react';
import ProductForm from '../components/ProductForm';
import { connect } from 'react-redux';

import { cleanState } from '../store/actions/products';

class EditProduct extends Component {

    static navigationOptions = {
        title: 'Editar Produto'
    };

    componentDidMount() {
        // this.props._cleanState();
    }

    render() {
        
        const { providerName, product } = this.props.navigation.state.params;

        return (
            <ProductForm
                providerName={providerName}
                product={product}
            />
        );

    }

}

const mapDispatchToProps = dispatch => {
    return {
        _cleanState: () => dispatch(cleanState())
    }
}

export default connect(null, mapDispatchToProps)(EditProduct);