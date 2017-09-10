import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as formReducer } from 'redux-form';
import suveysReducer from './surveysReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    surveys: suveysReducer
})