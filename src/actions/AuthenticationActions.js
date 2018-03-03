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
                user: response.data,
                token: response.headers.Authorization
            });
        });
    },

    logout: (id) => {
        axios.post("https://medicamp-so.appspot.com/api/auth/logout/"+id)
        .then((response) => {
            AppDispatcher.dispatch({
                user: null,
                token: null
            });
        });
    }

}