import React from 'react';
import { Switch, Route, } from 'react-router-dom'
import TestComponent from './TestComponent';
import About from './About';
import Contact from './Contact';
import Admin from './Admin';
import Profile from './Users/Profile';
import KindOverview from './Kinderen/KindOverview';
import KindDetail from './Kinderen/KindDetail';

class Main extends React.Component {
    render() {
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={TestComponent} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/contact' component={Contact} />
                    <Route exact path='/admin' component={Admin} />
                    <Route exact path='/profile/:login' component={Profile} />
                    <Route exact path='/profile/:login/kind' component={KindOverview} />
                    <Route exact path='/profile/:login/kind/:idkind' component={KindDetail} />
                    
                </Switch>
            </main>
        );
    }
}

export default Main;