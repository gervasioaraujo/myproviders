import Realm from 'realm';
import Provider from './models/Provider'
import Product from './models/Product'

let realmLocalDB;

export const getLocalRealm = function () {

    if (realmLocalDB)
        return realmLocalDB;
    else {
        realmLocalDB = new Realm({
            schema: [
                Provider.schema,
                Product.schema,
            ],
            schemaVersion: 0,
            migration: () => { }
        });
        // console.warn("Opened Local Realm");
        return realmLocalDB;
    }

}
