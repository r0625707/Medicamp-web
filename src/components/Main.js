import React from 'react';
import { Switch, Route, } from 'react-router-dom'
import TestComponent from './TestComponent';
import About from './About';
import Contact from './Contact';
import Admin from './Admin';
import Profile from './Users/Profile';
import KindOverview from './Kinderen/KindOverview';
import KindDetail from './Kinderen/KindDetail';
import Logout from './Users/Logout';
import VoogdOverviewKind from './Voogden/VoogdOverviewKind';
import VoogdOverviewUser from './Voogden/VoogdOverviewUser';
import DieetOverview from './Dieet/DieetOverview';
import MedicatieOverview from './Medicatie/MedicatieOverview';
import ZiekteOverview from './Ziekte/ZiekteOverview';

class Main extends React.Component {
    render() {
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={TestComponent} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/contact' component={Contact} />
                    <Route exact path='/admin' component={Admin} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/profile/voogd' component={VoogdOverviewUser} />
                    <Route exact path='/profile/kind' component={KindOverview} />
                    <Route exact path='/profile/kind/:idkind' component={KindDetail} />
                    <Route exact path='/profile/kind/:idkind/voogd' component={VoogdOverviewKind} />
                    <Route exact path='/profile/kind/:idkind/dieet' component={DieetOverview} />
                    <Route exact path='/profile/kind/:idkind/medicatie' component={MedicatieOverview} />
                    <Route exact path='/profile/kind/:idkind/ziekte' component={ZiekteOverview} />
                    <Route exact path='/logout' component={Logout} />
                </Switch>
            </main>
        );
    }
}

export default Main;