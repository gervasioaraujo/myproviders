import {
    CHANGE_PROVIDER_FORM_NAME,
    CHANGE_PROVIDER_FORM_CNPJ,
    CHANGE_PROVIDER_FORM_FONE,
    CHANGE_PROVIDER_FORM_ADDRESS,
    CREATED_PROVIDER,
    ERROR_CREATE_PROVIDER,
    GET_PROVIDER_EDIT,
    UPDATED_PROVIDER,
    CLEAN_PROVIDER_FORM,
    CLEAN_PROVIDER_FORM_FEEDBACK_MESSAGE,
} from '../actions/actionTypes';

const initialState = {
    name: '',
    cnpj: '',
    fone: '',
    address: '',
    error: false,
    message: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PROVIDER_FORM_NAME:
            return {
                ...state,
                name: action.name
            }
        case CHANGE_PROVIDER_FORM_CNPJ:
            return {
                ...state,
                cnpj: action.cnpj
            }
        case CHANGE_PROVIDER_FORM_FONE:
            return {
                ...state,
                fone: action.fone
            }
        case CHANGE_PROVIDER_FORM_ADDRESS:
            return {
                ...state,
                address: action.address
            }
        case CREATED_PROVIDER:
            return {
                // ...state,
                ...initialState,
                message: action.successMsg
            }
        case ERROR_CREATE_PROVIDER:
            return {
                ...state,
                error: true,
                message: action.errorMsg
            }
        case GET_PROVIDER_EDIT: {
            const { name, cnpj, fone, address } = action.provider;
            return {
                ...state,
                name,
                cnpj,
                fone,
                address
            }
        }
        case UPDATED_PROVIDER:
            return {
                ...state,
                error: false,
                message: action.successMsg
            }
        case CLEAN_PROVIDER_FORM:
            return {
                ...initialState
            }
        case CLEAN_PROVIDER_FORM_FEEDBACK_MESSAGE:
            return {
                ...state,
                error: false,
                message: ''
            }
        default:
            return state
    }
}

export default reducer;
