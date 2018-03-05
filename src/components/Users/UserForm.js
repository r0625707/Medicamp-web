import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            error: false,
            role: 2,
            login: "",
            naam: "",
            voornaam: "",
            tel: "",
            password: "",
            passwordrep: ""
        };

        this.toggle = this.toggle.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onVoornaamChange = this.onVoornaamChange.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onTelChange = this.onTelChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordrepChange = this.onPasswordrepChange.bind(this);
        this.postData = this.postData.bind(this);
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

    onRoleChange(event) {
        this.setState({
            role: event.target.value
        });
    }

    onNaamChange(event) {
        this.setState({
            naam: event.target.value
        });
    }

    onVoornaamChange(event) {
        this.setState({
            voornaam: event.target.value
        });
    }

    onLoginChange(event) {
        this.setState({
            login: event.target.value
        });
    }

    onTelChange(event) {
        this.setState({
            tel: event.target.value
        });
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    }

    onPasswordrepChange(event) {
        this.setState({
            passwordrep: event.target.value
        });
    }

    postData() {
        axios.post('https://medicamp-so.appspot.com/api/auth/register', {
            login: this.state.login,
            naam: this.state.naam,
            role: this.state.role,
            tel: this.state.tel,
            voornaam: this.state.voornaam,
            password: this.state.password
        })
            .then((response) => {
                this.toggle();
            })
            .catch((error) => {
                this.toggleError();
            });
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} style={{ cursor: 'pointer' }}>Registreren</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Account aanmaken</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup tag="fieldset">
                                <legend>Rol</legend>
                                <FormGroup inline>
                                    <select
                                        value={this.state.role}
                                        onChange={this.onRoleChange}
                                    >
                                        <option value="0">Admin</option>
                                        <option value="1">Hoofdleiding</option>
                                        <option value="2">Ouder</option>
                                        <option value="3">Leiding</option>
                                    </select>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="naam">Naam*</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="voornaam">Voornaam*</Label>
                                <Input type="text" name="voornaam" id="voornaam" value={this.state.voornaam} onChange={this.onVoornaamChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="tel">Tel.</Label>
                                <Input type="telephone" name="tel" id="tel" value={this.state.tel} onChange={this.onTelChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="login">Email*</Label>
                                <Input type="email" name="login" id="login" value={this.state.login} onChange={this.onLoginChange} />
                            </FormGroup>
                            <FormGroup inline>
                                <Label for="password">Wachtwoord*</Label>
                                <Input type="password" name="password" id="password" value={this.state.password} onChange={this.onPasswordChange} />
                                <Label for="passwordrep">Herhaal wachtwoord*</Label>
                                <Input type="password" name="passwordrep" id="passwordrep" value={this.state.passwordrep} onChange={this.onPasswordrepChange} />
                            </FormGroup>
                        </Form>
                        <p>* velden zijn verplicht </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.postData} style={{ cursor: 'pointer' }}>Opslaan</Button>
                        <Button onClick={this.toggle} style={{ cursor: 'pointer' }}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.error} toggle={this.toggleError}>
                    <ModalHeader color="warning"><i className="fa fa-exclamation-triangle"></i> Foutmelding</ModalHeader>
                    <ModalBody>
                        <p>Er ging iets mis bij het aanmaken van uw account.</p>
                        <p>Controleer de in te vullen velden en probeer het opnieuw.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggleError} style={{cursor:'pointer'}}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default UserForm;