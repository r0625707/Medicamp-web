import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {

    componentWillMount() {
        localStorage.setItem('token', null);
        localStorage.setItem('login', null);
        localStorage.setItem('role', null);
        localStorage.setItem('isAuthenticated', false);
        localStorage.setItem('naam', null);
        localStorage.setItem('voornaam', null);
        localStorage.setItem('tel', null);
    }

    render() {
        return (
            <Redirect to="/" />
        )
    }

}

export default Logout;