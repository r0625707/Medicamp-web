import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthenticationConstants from '../constants/AuthenticationConstants';
import { EventEmitter } from 'events';
import jwt_decode from 'jwt-decode';

let _login = "";
let _token = "";
let _role = "";
let _isAuthenticated = false;

const CHANGE_EVENT = 'change';

function setLogin(login) {
    _login = login;
}

function setToken(token) {
    _token = token;
}

function setRole(role) {
    _role = role;
}

function setAuthenticated(auth) {
    _isAuthenticated = auth;
}

class AuthenticationStoreClass extends EventEmitter {

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    getLogin() {
        return _login;
    }

    getToken() {
        return _token;
    }

    getRole() {
        return _role;
    }

    isAuthenticated() {
        return _isAuthenticated;
    }

}

const AuthenticationStore = new AuthenticationStoreClass();

AuthenticationStore.dispatchToken = AppDispatcher.register(action => {

    switch(action.actionType) {
        case AuthenticationConstants.LOGIN:
            setToken(action.token);
            var token = jwt_decode(_token);
            setLogin(token.sub);
            setRole(token.role);
            setAuthenticated(true);
            AuthenticationStore.emitChange();
            break

        case AuthenticationConstants.LOGOUT:
            setLogin(null);
            setToken(null);
            setRole(null);
            setAuthenticated(false);
            AuthenticationStore.emitChange();
            break

        default:

    }

});

export default AuthenticationStore;