import {
  CREATED_PROVIDER,
  ERROR_CREATE_PROVIDER,
  GET_PROVIDER,
  ERROR_GET_PROVIDER,
  GET_PROVIDERS,
  ERROR_GET_PROVIDERS,
  UPDATED_PROVIDER,
  ERROR_UPDATE_PROVIDER,
  DELETED_PROVIDER,
  ERROR_DELETE_PROVIDER,
  CLEAN_PROVIDER_STATE,
  SEARCHED_PROVIDER,
  ERROR_SEARCHED_PROVIDER
} from './actionTypes';
import { getLocalRealm } from '../../db';
import Provider from '../../db/models/Provider';

export const createProvider = (payload) => {
  try {
    const localRealm = getLocalRealm();
    const createdProvider = Provider.create(localRealm, payload);
    if (createdProvider) {
      return {
        type: CREATED_PROVIDER,
        successMsg: "Fornecedor adicionado ao banco!",
        createdProvider
      }
    } else {
      return {
        type: ERROR_CREATE_PROVIDER,
        errorMsg: "Erro ao adicionar Fornecedor ao banco!"
      }
    }
  } catch (error) {
    return {
      type: ERROR_CREATE_PROVIDER,
      errorMsg: error
    }
  }
}

export const getProviderById = (providerId) => {
  try {
    const localRealm = getLocalRealm();
    const provider = Provider.getById(localRealm, providerId);
    if (provider) {
      return {
        type: GET_PROVIDER,
        provider
      }
    } else {
      return {
        type: ERROR_GET_PROVIDER,
      }
    }
  } catch (error) {
    return {
      type: ERROR_GET_PROVIDER,
    }
  }
}

export const getProviders = () => {
  try {
    const localRealm = getLocalRealm();
    const providers = Provider.getAll(localRealm);
    if (providers) {
      return {
        type: GET_PROVIDERS,
        providers: providers.map(provider => {
          return {
            id: provider.id,
            name: provider.name,
            cnpj: provider.cnpj,
            fone: provider.fone,
            address: provider.address,
            products: provider.products
          }
        })
      }
    } else {
      return {
        type: ERROR_GET_PROVIDERS,
        providers
      }
    }
  } catch (error) {
    return {
      type: ERROR_GET_PROVIDERS,
      providers
    }
  }
}

export const updateProvider = (payload) => {
  try {
    const localRealm = getLocalRealm();
    const { id, name, cnpj, fone, address } = payload;
    const data = { name, cnpj, fone, address };
    const updated = Provider.update(localRealm, data, id);
    if (updated) {
      return {
        type: UPDATED_PROVIDER,
        successMsg: "Dados do fornecedor atualizados!"
      }
    }
    else {
      return {
        type: ERROR_UPDATE_PROVIDER,
        errorMsg: "Erro ao atualizar Fornecedor!"
      }
    }
  } catch (error) {
    return {
      type: ERROR_UPDATE_PROVIDER,
      errorMsg: error
    }
  }

}

export const deleteProvider = (providerId) => {
  try {
    const localRealm = getLocalRealm();
    Provider.delete(localRealm, providerId);
    return {
      type: DELETED_PROVIDER,
      successMsg: "Fornecedor excluído do banco!"
    }
  } catch (error) {
    return {
      type: ERROR_DELETE_PROVIDER,
      errorMsg: error
    }
  }

}

export const cleanState = () => {
  return {
    type: CLEAN_PROVIDER_STATE
  }
}

export const searchProvider = (text) => {
  try {
    const localRealm = getLocalRealm();
    let providers = Provider.getByNameContains(localRealm, text);
    if (providers.length === 0) {
      providers = Provider.getByCNPJContains(localRealm, text);
    }
    return {
      type: SEARCHED_PROVIDER,
      providers: providers.map(provider => {
        return {
          id: provider.id,
          name: provider.name,
          cnpj: provider.cnpj,
          fone: provider.fone,
          address: provider.address,
          products: provider.products
        }
      })
    }
  } catch (error) {
    return {
      type: ERROR_SEARCHED_PROVIDER,
      errorMsg: error
    }
  }
}