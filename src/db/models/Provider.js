import Product from './Product';

export default class Provider {

    static schema = {
        name: 'Provider',
        primaryKey: 'id',
        properties: {
            id: 'int',
            name: 'string',
            cnpj: 'string',
            fone: 'string',
            address: 'string',
            products: { type: 'list', objectType: 'Product' },
        }
    };

    static getById(realm, providerId) {
        let provider = null;
        const results = realm.objects(Provider.schema.name).filtered('id = $0', providerId);
        if (results) {
            provider = results[0];
        }
        return provider;
    }

    static create(realm, provider) {
        const lastProvider = realm.objects(Provider.schema.name).sorted('id', true)[0]
        const providerId = lastProvider ? lastProvider.id + 1 : 1;
        let created = null;
        realm.write(() => {
            created = realm.create(Provider.schema.name, {
                id: providerId,
                name: provider.name,
                cnpj: provider.cnpj,
                fone: provider.fone,
                address: provider.address,
                products: [],
            })
        });
        return created;
    }

    static getAll(realm) {
        const providers = realm.objects(Provider.schema.name);
        return providers;
    }

    static update(realm, data, providerId) {

        let provider = Provider.getById(realm, providerId);
        const properties = Object.keys(data);
        realm.write(() => {
            properties.forEach(p => {
                provider[p] = data[p]
            });
        });

        return provider;
    }

    static delete(realm, providerId) {
        realm.write(() => {
            let provider = Provider.getById(realm, providerId);
            realm.delete(provider);
            let products = realm.objects(Product.schema.name).filtered('providerId = $0', providerId);
            realm.delete(products);
        });
    }

    static getByNameContains(realm, text) {
        const providers = realm.objects(Provider.schema.name).filtered(`name CONTAINS[c] "${text}"`);
        return providers;
    }

    static getByCNPJContains(realm, text) {
        const providers = realm.objects(Provider.schema.name).filtered(`cnpj CONTAINS[c] "${text}"`);
        return providers;
    }

}