import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
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
        // console.warn(text);
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
                    // autoFocus
                    placeholder='Buscar...'
                    onBlur={() => this.setState({ searchActive: false })}
                />
                {/* <TouchableOpacity
                    onPress={() => this.setState({ searchActive: false })}
                    style={styles.closeSearchButtom}
                >
                    <Icon name='close' size={15} color='black' />
                </TouchableOpacity> */}
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

// const mapStateToProps = ({ filtersReducer }) => {
//     return {
//         searchText: filtersReducer.searchText,
//         comercialSegmentSelected: filtersReducer.comercialSegmentSelected
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        _searchProvider: (searchText) => dispatch(searchProvider(searchText))
    }
}

export default connect(null, mapDispatchToProps)(SearchInput)