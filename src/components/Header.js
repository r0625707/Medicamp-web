import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };

        this.authItems = this.authItems.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    authItems() {
        if (localStorage.getItem('isAuthenticated') && localStorage.getItem('role') !== -1) {
            return (
                <div>
                    <NavItem>
                        <NavLink tag={Link} to="/profile">Profiel</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/logout">Afmelden</NavLink>
                    </NavItem>
                </div>
            )
        }

        if (localStorage.getItem('isAuthenticated') && localStorage.getItem('role') === -1) {
            return (
                <div>
                    <NavItem>
                        <NavLink tag={Link} to="/profile">Profiel</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/admin">Admin</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/logout">Afmelden</NavLink>
                    </NavItem>
                </div>
            )
        }
    }

    render() {
        return (
            <header>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand tag={Link} to="/">Medicamp</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} style={{ cursor: 'pointer' }} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/about">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/contact">Contact</NavLink>
                            </NavItem>
                            {this.authItems()}
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;