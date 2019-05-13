import actionTypes from '../actiontypes';
import states from './states';
import dotProp from 'dot-prop-immutable';


export default function session_flow_details(state = states.session_flow_details, action) {
    switch (action.type) {
        case actionTypes.UPDATE_SESSION_FLOW_FILTER: {
            return dotProp.set(state, action.path, action.payload);
        }

        case actionTypes.SESSION_FLOW_LOADED: {
            return {
                ...state,
                session_flow: action.payload && action.payload.treeData ? action.payload.treeData : [...state.session_flow]
            };
        }

        default:
            return state;
    }
}
