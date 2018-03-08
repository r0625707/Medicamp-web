import React from 'react';
import GroepList from './Groepen/GroepList';
import TestComponent from './TestComponent';

class LandingPage extends React.Component {

    render() {
        if(localStorage.getItem('isAuthenticated') === true) {
            return(
                <GroepList />
            );
        } else {
            return(
                <TestComponent />
            )
        }

    }
}

export default LandingPage;