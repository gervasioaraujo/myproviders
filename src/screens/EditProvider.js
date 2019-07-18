import React, { Component } from 'react';
import ProviderForm from '../components/ProviderForm';
import { connect } from 'react-redux';

import { cleanState } from '../store/actions/providers';

class EditProvider extends Component {

    static navigationOptions = {
        title: 'Editar Fornecedor'
    };

    componentDidMount() {
        this.props._cleanState();
    }

    componentWillUnmount() {
        this.props._cleanState();
    }

    render() {

        const { provider } = this.props.navigation.state.params;

        return (
            <ProviderForm mode="update" provider={provider} />
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        _cleanState: () => dispatch(cleanState())
    }
}

export default connect(null, mapDispatchToProps)(EditProvider);