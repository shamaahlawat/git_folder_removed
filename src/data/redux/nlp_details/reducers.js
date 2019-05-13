import actionTypes from '../actiontypes';
import states from './states';

export default function nlp_details(state = states.nlp_details, action) {
    switch (action.type) {
        case actionTypes.INTENTS_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    intents_loading: true,
                    intents_loaded: false,
                }
            };

        case actionTypes.INTENTS_RECEIVED: {
            return {
                ...state,
                intents: [...action.payload],
                loaders: {
                    ...state.loaders,
                    intents_loading: false,
                    intents_loaded: true,
                }
            };
        }

        case actionTypes.INTENTS_ERROR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    intents_loading: false,
                    intents_loaded: false,
                }
            };

        case actionTypes.ENTITIES_LOADING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    entities_loading: true,
                    entities_loaded: false,
                }
            };

        case actionTypes.ENTITIES_RECEIVED: {
            return {
                ...state,
                entities: [...action.payload],
                loaders: {
                    ...state.loaders,
                    entities_loading: false,
                    entities_loaded: true,
                }
            };
        }

        case actionTypes.ENTITIES_ERROR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    entities_loading: false,
                    entities_loaded: false,
                }
            };

        case actionTypes.NLP_SNAPSHOT_UPDATING:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    intents_updating: true,
                    intents_updated: false,
                }
            };

        case actionTypes.NLP_SNAPSHOT_UPDATED:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    intents_updating: false,
                    intents_updated: true,
                }
            };

        case actionTypes.NLP_SNAPSHOT_UPDATION_ERROR:
            return {
                ...state,
                loaders: {
                    ...state.loaders,
                    intents_updating: false,
                    intents_updated: false,
                }
            };

        default:
            return state;
    }
}
