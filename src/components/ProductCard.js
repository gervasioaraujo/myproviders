import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { deleteProduct } from '../store/actions/products';

class ProductCard extends Component {

    numberToCurrencyReal(n, c, d, t) {
        ; (c = isNaN((c = Math.abs(c))) ? 2 : c),
            (d = d == undefined ? ',' : d),
            (t = t == undefined ? '.' : t),
            (s = n < 0 ? '-' : ''),
            (i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + ''),
            (j = (j = i.length) > 3 ? j % 3 : 0)
        return (
            'R$ ' +
            s +
            (j ? i.substr(0, j) + t : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
            (c
                ? d +
                Math.abs(n - i)
                    .toFixed(c)
                    .slice(2)
                : '')
        )
    }

    _editProductButtom = () => {
        const { product, provider, navigation } = this.props;
        navigation.navigate('EditProduct', { product, provider });
    }

    _deleteProductButtom = () => {
        Alert.alert(
            'ATENÇÃO!',
            'Tem certeza que deseja exluir o registro?',
            [
                { text: 'Cancelar', onPress: () => null },
                {
                    text: 'Confirmar', onPress: () => {
                        const { product, _deleteProduct, navigation } = this.props;
                        _deleteProduct(product.id);
                        Alert.alert('OK', "Registro excluído do banco!");
                        // navigation.navigate('ListProducts');
                    }
                },
            ],
            { cancelable: false }
        );
    }

    render() {

        const { product } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.productInfoContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text>
                        Custo:
                        <Text style={styles.productPrice}> {this.numberToCurrencyReal(product.price)}</Text>
                    </Text>
                </View>
                <View style={styles.buttomsContainer}>
                    <TouchableOpacity
                        onPress={this._editProductButtom}
                        style={styles.editProductButtom}
                    >
                        <Icon name='edit' size={15} color='white' />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._deleteProductButtom}
                        style={styles.deleteProductButtom}
                    >
                        <Icon name='delete' size={15} color='white' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
        margin: 3,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    productInfoContainer: {
        flex: 1
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50'
    },
    productPrice: {
        fontSize: 14,
        color: '#2c3e50',
        fontWeight: 'bold'
    },
    buttomsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    editProductButtom: {
        backgroundColor: '#2980b9',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 15,
        marginRight: 5
    },
    deleteProductButtom: {
        backgroundColor: '#e74c3c',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 15
    }
});

const mapDispatchToProps = dispatch => {
    return {
        _deleteProduct: (id) => dispatch(deleteProduct(id)),
    }
}

export default connect(null, mapDispatchToProps)(ProductCard);