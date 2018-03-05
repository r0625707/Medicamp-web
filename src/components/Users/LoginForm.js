import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            login: "",
            password: "",
            error: false,
            isAuthenticated: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleError() {
        this.setState({
            error: !this.state.error
        });
    }

    onLoginChange(event) {
        this.setState({
            login: event.target.value
        });
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    login() {
        axios.post("https://medicamp-so.appspot.com/api/auth/login", {
            login: this.state.login,
            password: this.state.password
        })
        .then((response) => {
            localStorage.setItem('token', response.headers.authorization);
            var token = jwt_decode(response.headers.authorization);
            localStorage.setItem('login', token.sub);
            localStorage.setItem('role', token.role);
            localStorage.setItem('isAuthenticated', true);
            this.setState({
                isAuthenticated: true
            })
        })
        .then((response) => {
            axios.get("https://medicamp-so.appspot.com/api/user/"+localStorage.getItem('login')+'/', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            .then((response) => {
                localStorage.setItem('naam', response.data.naam);
                localStorage.setItem('voornaam', response.data.voornaam);
                localStorage.setItem('tel', response.data.tel);
            });
        })
        .catch((error) => {
            this.toggleError()
        });
    }

    render() {

        while(!this.state.isAuthenticated) {
            return (
                <div>
                    <Button color="primary" onClick={this.toggle} style={{ cursor: 'pointer' }}>Aanmelden</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>Aanmelden</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="login" className="mr-sm-2">Email</Label>
                                    <Input autoFocus="true" type="email" name="login" id="login" value={this.state.login} onChange={this.onLoginChange} />
                                </FormGroup>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="password" className="mr-sm-2">Wachtwoord</Label>
                                    <Input type="password" name="password" id="password" value={this.state.password} onChange={this.onPasswordChange} />
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.login} style={{ cursor: 'pointer' }}>Login</Button>
                            <Button onClick={this.toggle} style={{ cursor: 'pointer' }}>Annuleren</Button>
                        </ModalFooter>
                    </Modal>
                    <Modal isOpen={this.state.error} toggle={this.toggleError}>
                        <ModalHeader toggle={this.toggleError}>Foutmelding</ModalHeader>
                        <ModalBody>
                            <p>Verkeerd e-mail adres of wachtwoord</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.toggleError}>OK</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }

        return(
            <Redirect to='/Profile' />
        );
        
    }
}

export default LoginForm;