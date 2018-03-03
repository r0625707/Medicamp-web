import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import AuthenticationStore from '../../stores/AuthenticationStore';
import AuthenticationConstants from '../../constants/AuthenticatinConstants';
import AuthenticationActions from '../../actions/AuthenticationActions';

class LoginForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            login: "",
            password: ""
        };
        this.toggle = this.toggle.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.login = this.login.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
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
        AuthenticationActions.login(this.state.login, this.state.password);
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle} style={{cursor:'pointer'}}>Aanmelden</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Aanmelden</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="login" className="mr-sm-2">Email</Label>
                                <Input autoFocus="true" type="email" name="login" id="login" value={this.state.login} onChange={this.onLoginChange}/>
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="password" className="mr-sm-2">Wachtwoord</Label>
                                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.onPasswordChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.login} style={{cursor:'pointer'}}>Login</Button>
                        <Button onClick={this.toggle} style={{cursor:'pointer'}}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default LoginForm;