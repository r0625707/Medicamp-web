import React from 'react';
import { Row, Col, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import UserList from './Users/UserList';
import classnames from 'classnames';
import GroepList from './Groepen/GroepList';

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            style={{cursor:'pointer'}}
                        >
                            Gebruikers
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            style={{cursor:'pointer'}}
                        >
                            Groepen
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col xs="12" sm="12" md="10" lg="10">
                                <UserList />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col xs="12" sm="12" md="10" lg="10">
                                <GroepList />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }

}

export default Admin;