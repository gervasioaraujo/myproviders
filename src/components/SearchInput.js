import React, { Component } from 'react';
import {
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import { searchProvider } from '../store/actions/providers';

class SearchInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchActive: false,
        }
    }

    _onChangeSearchText = text => {
        this.props._searchProvider(text);
    }

    render() {

        const { navigation } = this.props;

        return (
            <View style={styles.container}>
                <Icon
                    name='search'
                    size={27}
                    color='black' />
                <TextInput
                    style={styles.searchText}
                    onChangeText={this._onChangeSearchText}
                    value={this.state.searchText}
                    placeholder='Buscar...'
                    onBlur={() => this.setState({ searchActive: false })}
                />
            </View>
        )
    }
}

const backgroundColorPrimary = '#f4511e'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff'
    },
    searchText: {
        flex: 1,
    },
    closeSearchButtom: {
        padding: 5
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        _searchProvider: (searchText) => dispatch(searchProvider(searchText))
    }
}

export default connect(null, mapDispatchToProps)(SearchInput)