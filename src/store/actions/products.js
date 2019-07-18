import {
  CREATED_PRODUCT,
  ERROR_CREATED_PRODUCT,
  GET_PROVIDER_PRODUCTS,
  ERROR_GET_PROVIDER_PRODUCTS,
  UPDATED_PRODUCT,
  ERROR_UPDATED_PRODUCT,
  DELETED_PRODUCT,
  ERROR_DELETE_PRODUCT,
  CLEAN_PRODUCT_STATE
} from './actionTypes';
import { getLocalRealm } from '../../db';
import Product from '../../db/models/Product';

export const createProduct = (payload) => {
  try {
    const localRealm = getLocalRealm();
    const createdProduct = Product.create(localRealm, payload);
    if (createdProduct) {
      return {
        type: CREATED_PRODUCT,
        successMsg: "Produto adicionado ao banco!",
        createdProduct
      }
    } else {
      return {
        type: ERROR_CREATED_PRODUCT,
        errorMsg: "Erro ao adicionar Produto ao banco!"
      }
    }
  } catch (error) {
    return {
      type: ERROR_CREATED_PRODUCT,
      errorMsg: error
    }
  }
}

export const getProductsByProviderId = (providerId) => {
  try {
    const localRealm = getLocalRealm();
    const products = Product.getProductsByProviderId(localRealm, providerId);
    if (products) {
      return {
        type: GET_PROVIDER_PRODUCTS,
        products
      }
    } else {
      return {
        type: ERROR_GET_PROVIDER_PRODUCTS,
      }
    }
  } catch (error) {
    return {
      type: ERROR_GET_PROVIDER_PRODUCTS,
    }
  }
}

export const updateProduct = (payload) => {
  try {
    const localRealm = getLocalRealm();
    const { id, name, price } = payload;
    const data = { name, price };
    const updated = Product.update(localRealm, data, id);
    if (updated) {
      return {
        type: UPDATED_PRODUCT,
        successMsg: "Produto atualizado!",
      }
    } else {
      return {
        type: ERROR_UPDATED_PRODUCT,
        errorMsg: "Erro ao atualizar Produto!"
      }
    }
  } catch (error) {
    return {
      type: ERROR_UPDATED_PRODUCT,
      errorMsg: error
    }
  }
}

export const deleteProduct = (productId) => {
  try {
    const localRealm = getLocalRealm();
    Product.delete(localRealm, productId);
    return {
      type: DELETED_PRODUCT,
      successMsg: "Produto excluído do banco!"
    }
  } catch (error) {
    return {
      type: ERROR_DELETE_PRODUCT,
      errorMsg: error
    }
  }

}

export const cleanState = () => {
  return {
    type: CLEAN_PRODUCT_STATE
  }
}