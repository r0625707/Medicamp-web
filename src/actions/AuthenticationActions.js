import AppDispatcher from '../dispatcher/AppDispatcher';
import axios from 'axios';

export default {

    login: (id, pass) => {
        axios.post("https://medicamp-so.appspot.com/api/auth/login", {
            login: id,
            password: pass
        })
            .then((response) => {
                AppDispatcher.dispatch({
                    actionType: 'LOGIN',
                    token: response.headers.authorization
                });
            });
    },

    logout: (id) => {
        AppDispatcher.dispatch({
            actionType: 'LOGOUT',
            token: null
        });
    }

}