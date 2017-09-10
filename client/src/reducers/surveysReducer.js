import {FETCH_SURVEYS} from '../actions/types';

export default function SurveysReducer(state = [],action){
    switch(action.type){
        case FETCH_SURVEYS:
            return action.payload;
            
        default:
            return state;
    }
}