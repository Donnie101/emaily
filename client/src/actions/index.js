import axios from 'axios'
import { FETCH_USER } from './types'

export function fetchUser() {
    return async(dispatch) => {
        const res = await axios.get('/api/current_user');
        dispatch({
            type: FETCH_USER,
            payload: res.data
        })
    }
}

export function handleToken(token) {
    return async(dispatch) => {
        const res = await axios.post('/api/stripe', token);
        dispatch({
            type: FETCH_USER,
            payload: res.data
        });
    }
}