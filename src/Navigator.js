import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import ListProviders from './screens/ListProviders';
import ViewProvider from './screens/ViewProvider';
import ListProducts from './screens/ListProducts';
import NewProvider from './screens/NewProvider';
import EditProvider from './screens/EditProvider';
import NewProduct from './screens/NewProduct';
import EditProduct from './screens/EditProduct';

const MainNavigator = createStackNavigator({
    ListProviders: {
        screen: ListProviders
    },
    ViewProvider: {
        screen: ViewProvider
    },
    ListProducts: {
        screen: ListProducts
    },
    NewProvider: {
        screen: NewProvider
    },
    EditProvider: {
        screen: EditProvider
    },
    NewProduct: {
        screen: NewProduct
    },
    EditProduct: {
        screen: EditProduct
    }
}, {
        initialRouteName: 'ListProviders',
        defaultNavigationOptions: {
            title: "My Providers",
            headerStyle: {
                backgroundColor: '#9b59b6',
            },
            headerTintColor: '#fff',
        }
    });

export default createAppContainer(MainNavigator);