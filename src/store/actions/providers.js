import { Alert } from 'react-native';
import {
  CHANGE_PROVIDER_FORM_NAME,
  CHANGE_PROVIDER_FORM_CNPJ,
  CHANGE_PROVIDER_FORM_FONE,
  CHANGE_PROVIDER_FORM_ADDRESS,
  CREATED_PROVIDER,
  ERROR_CREATE_PROVIDER,
  GET_PROVIDER_VIEW,
  ERROR_GET_PROVIDER,
  GET_PROVIDERS,
  ERROR_GET_PROVIDERS,
  GET_PROVIDER_EDIT,
  UPDATED_PROVIDER,
  ERROR_UPDATE_PROVIDER,
  DELETED_PROVIDER,
  ERROR_DELETE_PROVIDER,
  CLEAN_PROVIDER_STATE,
  CLEAN_PROVIDER_FORM,
  CLEAN_PROVIDER_FORM_FEEDBACK_MESSAGE,
  SEARCHED_PROVIDER,
  ERROR_SEARCHED_PROVIDER,
} from './actionTypes';
import { getLocalRealm } from '../../db';
import Provider from '../../db/models/Provider';

// FUNCTIONS DISPATCHED BY PROVIDERFORM
/**
 * 
 * @param {*} name 
 */
export const changeProviderFormName = (name) => {
  return {
    type: CHANGE_PROVIDER_FORM_NAME,
    name
  }
}

/**
 * 
 * @param {*} cnpj 
 */
export const changeProviderFormCNPJ = (cnpj) => {
  return {
    type: CHANGE_PROVIDER_FORM_CNPJ,
    cnpj
  }
}

/**
 * 
 * @param {*} fone 
 */
export const changeProviderFormFone = (fone) => {
  return {
    type: CHANGE_PROVIDER_FORM_FONE,
    fone
  }
}

/**
 * 
 * @param {*} address 
 */
export const changeProviderFormAddress = (address) => {
  return {
    type: CHANGE_PROVIDER_FORM_ADDRESS,
    address
  }
}

/**
 * 
 * @param {*} payload 
 */
export const createProvider = (payload) => {
  try {
    const localRealm = getLocalRealm();
    const createdProvider = Provider.create(localRealm, payload);
    if (createdProvider) {
      // console.warn(createdProvider)
      const { id, name, cnpj, fone, address } = createdProvider;
      return {
        type: CREATED_PROVIDER,
        successMsg: "Fornecedor adicionado ao banco!",
        createdProvider: { id, name, cnpj, fone, address }
        // createdProvider: Object.assign({}, { ...createdProvider })
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

export const getProviderById = (providerId, screen = "view") => {
  try {
    const localRealm = getLocalRealm();
    const provider = Provider.getById(localRealm, providerId);
    if (provider) {
      const { id, name, cnpj, fone, address } = provider;
      switch (screen) {
        case "view":
          return {
            type: GET_PROVIDER_VIEW,
            provider: { id, name, cnpj, fone, address }
          }
        case "edit":
          return {
            type: GET_PROVIDER_EDIT,
            provider: { id, name, cnpj, fone, address }
          }
        default:
          return {
            type: GET_PROVIDER_VIEW,
            provider: { id, name, cnpj, fone, address }
          }
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
    const providersDB = Provider.getAll(localRealm);
    if (providersDB) {
      return {
        type: GET_PROVIDERS,
        providers: providersDB.map(provider => {
          const { id, name, cnpj, fone, address } = provider;
          return { id, name, cnpj, fone, address };
        })
      }
    } else {
      return {
        type: ERROR_GET_PROVIDERS
      }
    }
  } catch (error) {
    return {
      type: ERROR_GET_PROVIDERS
    }
  }
}

export const updateProvider = (payload) => {
  try {
    const localRealm = getLocalRealm();
    const { id, name, cnpj, fone, address } = payload;
    const data = { name, cnpj, fone, address };
    const updatedProvider = Provider.update(localRealm, data, id);
    if (updatedProvider) {
      const { id, name, cnpj, fone, address } = updatedProvider;
      return {
        type: UPDATED_PROVIDER,
        successMsg: "Dados do fornecedor atualizados!",
        updatedProvider: { id, name, cnpj, fone, address }
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
    Provider.delete(localRealm, providerId); // !!!!!!!!!!!!!!!!!!!!!!!!!!

    Alert.alert('OK', "Fornecedor excluído do banco!");
    return {
      type: DELETED_PROVIDER,
      deletedProviderId: providerId
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

export const cleanProviderForm = () => {
  return {
    type: CLEAN_PROVIDER_FORM
  }
}

export const cleanProviderFormFeedbackMessage = () => {
  return {
    type: CLEAN_PROVIDER_FORM_FEEDBACK_MESSAGE
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