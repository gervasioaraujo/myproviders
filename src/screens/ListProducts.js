import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { getProductsByProviderId } from '../store/actions/products';
import ProductCard from '../components/ProductCard';
import FeedbackMessage from '../components/FeedbackMessage';

class ListProducts extends Component {

    static navigationOptions = ({ navigation }) => {

        const { params } = navigation.state;

        return {
            title: `${params.provider.name} - Produtos`,
        };
    };

    didFocus = this.props.navigation.addListener('didFocus', () => {
        const { id } = this.props.navigation.state.params.provider;
        this.props._getProductsByProviderId(id);
    });

    componentDidMount() {
        const { id } = this.props.navigation.state.params.provider;
        this.props._getProductsByProviderId(id);
    }

    _addNewProductButtom = () => {
        const { navigation } = this.props;
        const { provider } = navigation.state.params;
        navigation.navigate('NewProduct', { provider });
    }

    render() {

        const { navigation, products } = this.props;
        const { provider } = navigation.state.params;

        return (
            <View style={styles.listContainer}>
                {(products && products.length === 0) && <FeedbackMessage mode="danger" message="Nenhum registro encontrado!" />}
                {
                    (products && products.length) > 0 &&
                    <FlatList
                        contentContainerStyle={styles.productsFlatList}
                        data={products}
                        renderItem={({ item }) => <ProductCard product={item} provider={provider} navigation={navigation} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                }
                <TouchableOpacity
                    onPress={this._addNewProductButtom}
                    style={styles.addNewProductButtom}
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
    productsFlatList: {
        padding: 5,
        paddingBottom: 80
    },
    addNewProductButtom: {
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
    },
});

const mapStateToProps = ({ productsReducer }) => {
    return {
        products: productsReducer.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        _getProductsByProviderId: (providerId) => dispatch(getProductsByProviderId(providerId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);