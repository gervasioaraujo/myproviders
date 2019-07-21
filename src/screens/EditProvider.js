import React, { Component } from 'react';
import ProviderForm from '../components/ProviderForm';
import { connect } from 'react-redux';

import { getProviderById, cleanProviderForm } from '../store/actions/providers';

class EditProvider extends Component {

    static navigationOptions = {
        title: 'Editar Fornecedor'
    };

    componentDidMount() {
        const { providerId } = this.props.navigation.state.params;
        this.props._getProviderById(providerId, "edit");
    }

    componentWillUnmount() {
        this.props._cleanProviderForm();
    }

    render() {

        const { name, cnpj, fone, address, navigation } = this.props;
        const { providerId } = navigation.state.params;

        return (
            <ProviderForm
                id={providerId}
                name={name}
                cnpj={cnpj}
                fone={fone}
                address={address}
            />
        );
    }

}

const mapStateToProps = ({ providerFormReducer }) => {
    const { name, cnpj, fone, address } = providerFormReducer;
    return { name, cnpj, fone, address };
}

const mapDispatchToProps = dispatch => {
    return {
        _getProviderById: (providerId, screen) => dispatch(getProviderById(providerId, screen)),
        _cleanProviderForm: () => dispatch(cleanProviderForm())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProvider);