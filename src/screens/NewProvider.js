import React, { Component } from 'react';
import ProviderForm from '../components/ProviderForm';
import { connect } from 'react-redux';

import { cleanState } from '../store/actions/providers';

class NewProvider extends Component {

    static navigationOptions = {
        title: 'Adicionar Fornecedor'
    };

    componentDidMount() {
        this.props._cleanState();
    }

    render() {
        return (
            <ProviderForm mode="create" />
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        _cleanState: () => dispatch(cleanState())
    }
}

export default connect(null, mapDispatchToProps)(NewProvider);