import AppDispatcher from '../dispatcher/AppDispatcher';
import AuthenticationConstants from '../constants/AuthenticatinConstants';
import { EventEmitter } from 'events';

let _user = {};
let _token = "";
let _isAuthenticated = false;

const CHANGE_EVENT = 'change';

function setUser(user) {
    _user = user;
}

function setToken(token) {
    _token = token;
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

    getUser() {
        return _user;
    }

    getToken() {
        return _token;
    }

    isAuthenticated() {
        return _isAuthenticated;
    }

}

const AuthenticationStore = new AuthenticationStoreClass();

AuthenticationStore.dispatchToken = AppDispatcher.register(action => {

    switch(action.actionType) {
        case AuthenticationConstants.LOGIN:
            setUser(action.user);
            setToken(action.token);
            setAuthenticated(true);
            AuthenticationStore.emitChange();
            break

        case AuthenticationConstants.LOGOUT:
            setUser(null);
            setToken(null);
            setAuthenticated(false);
            AuthenticationStore.emitChange();
            break

        default:

    }

});

export default AuthenticationStore;