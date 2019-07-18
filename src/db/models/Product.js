export default class Product {

    static schema = {
        name: 'Product',
        primaryKey: 'id',
        properties: {
            id: 'int',
            name: 'string',
            price: 'double',
            providerId: 'int'
        }
    }

    static getById(realm, productId) {
        let product = null;
        const results = realm.objects(Product.schema.name).filtered('id = $0', productId);
        if (results) {
            product = results[0];
        }
        return product;
    }

    static create(realm, product) {
        const lastProduct = realm.objects(Product.schema.name).sorted('id', true)[0]
        const productId = lastProduct ? lastProduct.id + 1 : 1;
        let created = null;
        realm.write(() => {
            created = realm.create(Product.schema.name, {
                id: productId,
                name: product.name,
                price: product.price,
                providerId: product.providerId
            })
        });
        return created;
    }

    static getProductsByProviderId(realm, providerId) {
        let products = realm.objects(Product.schema.name).filtered('providerId = $0', providerId);
        return products;
    }

    static update(realm, data, productId) {

        let product = Product.getById(realm, productId);
        const properties = Object.keys(data);
        realm.write(() => {
            properties.forEach(p => {
                product[p] = data[p]
            });
        });

        return product;
    }

    static delete(realm, productId) {
        realm.write(() => {
            let product = Product.getById(realm, productId);
            realm.delete(product);
        });
    }

}