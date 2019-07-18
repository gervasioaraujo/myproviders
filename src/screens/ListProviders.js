import React, { Component } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { getProviders } from '../store/actions/providers';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ProviderCard from '../components/ProviderCard';
import FeedbackMessage from '../components/FeedbackMessage';
import SearchInput from '../components/SearchInput';

class ListProviders extends Component {

    didFocus = this.props.navigation.addListener('didFocus', () => {
        this.props._getProviders();
    });

    _addNewProviderButtom = () => {
        const { navigation } = this.props;
        navigation.navigate('NewProvider');
    }

    componentDidMount() {
        this.props._getProviders();
    }

    render() {

        const { navigation, providers } = this.props;
        return (
            <View style={styles.listContainer}>
                <SearchInput />
                {(providers && providers.length === 0) && <FeedbackMessage mode="danger" message="Nenhum registro encontrado!" />}
                {
                    (providers && providers.length > 0) &&
                    <FlatList
                        contentContainerStyle={styles.providerFlatList}
                        data={providers}
                        renderItem={({ item }) => <ProviderCard provider={item} navigation={navigation} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
                <TouchableOpacity
                    onPress={this._addNewProviderButtom}
                    style={styles.addNewProviderButtom}
                >
                    <Icon name='add' size={30} color='white' />
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    providerFlatList: {
        padding: 5,
        paddingBottom: 80
    },
    addNewProviderButtom: {
        backgroundColor: '#27ae60',
        position: 'absolute',
        right: 15,
        bottom: 15,
        height: 60,
        justifyContent: 'center',
        borderRadius: 15,
        padding: 15
    },
    textButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14
    }
});

const mapStateToProps = ({ providersReducer }) => {
    return {
        providers: providersReducer.providers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _getProviders: () => dispatch(getProviders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProviders);