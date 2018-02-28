import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class UpdateForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            role: 2,
            login: "",
            naam: "",
            voornaam: "",
            tel: "",
            password: "",
            passwordrep: ""
        };

        this.toggle = this.toggle.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onVoornaamChange = this.onVoornaamChange.bind(this);
        this.onTelChange = this.onTelChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
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

    updateUser() {
        axios.put('https://medicamp-so.appspot.com/api/user/'+this.props.login+'/', {
            login: this.state.login,
            naam: this.state.naam,
            role: this.state.role,
            tel: this.state.tel,
            voornaam: this.state.voornaam
        })
        .then((response) => {
            this.toggle();
        });
    }

    loadUser() {
        axios.get("https://medicamp-so.appspot.com/api/user/"+this.props.login+"/")
        .then((response) => {
            this.setState({
                login: response.data.login,
                naam: response.data.naam,
                voornaam: response.data.voornaam,
                tel: response.data.tel,
                role: response.data.role
            });
        });
    }

    componentDidMount() {
        this.loadUser();
    }

    render() {
        return(
            <div>
                <Button onClick={this.toggle} color="warning" style={{cursor:'pointer'}}><i className="fa fa-edit"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.voornaam} {this.state.naam} bewerken</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup tag="fieldset">
                                <legend>Rol</legend>
                                <FormGroup inline>
                                    <select
                                        value={this.state.role}
                                        onChange={this.onRoleChange}
                                    >
                                        <option value="-1">Admin</option>
                                        <option value="0">Hoofdleiding</option>
                                        <option value="1">Ouder</option>
                                        <option value="2">Leiding</option>
                                    </select>
                                </FormGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label for="naam">Naam</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="voornaam">Voornaam</Label>
                                <Input type="text" name="voornaam" id="voornaam" value={this.state.voornaam} onChange={this.onVoornaamChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="tel">Tel.</Label>
                                <Input type="tel" name="tel" id="tel" value={this.state.tel} onChange={this.onTelChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="login">Email</Label>
                                <Input type="email" name="login" id="login" disabled value={this.state.login}/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateUser} style={{cursor:'pointer'}}>Opslaan</Button>
                        <Button onClick={this.toggle} style={{cursor:'pointer'}}>Annuleren</Button>
                    </ModalFooter>
                </Modal>                    
            </div>
        );
    }

}

export default UpdateForm;