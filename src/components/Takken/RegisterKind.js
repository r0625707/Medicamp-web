import React from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, Input, FormGroup } from 'reactstrap';

class RegisterKind extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kinderen: [],
            modal: false,
            error: false,
            idkind: null
        };
        this.headers = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.toggle = this.toggle.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.loadData = this.loadData.bind(this);
        this.postData = this.postData.bind(this);
        this.onKindChange = this.onKindChange.bind(this);
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

    onKindChange(event) {
        this.setState({
            idkind: event.target.value
        });
    }

    postData() {
        axios.post("https://medicamp-so.appspot.com/api/tak/" + this.props.idtak + "/kind/" + this.state.idkind, null, this.headers)
            .then((response) => {
                this.toggle();
            })
            .catch((error) => {
                this.toggleError();
            });
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/user/"+localStorage.getItem('login')+"/kind", this.headers)
        .then((response) => {
            this.setState({
                kinderen: response.data
            });
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} color="primary">Kind registreren</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Kind registreren - {this.props.naamtak}
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="kind">Kind </Label>
                                <select
                                    value={this.state.idkind}
                                    onChange={this.onKindChange}
                                >
                                    <option disabled selected>Selecteer een kind... </option>
                                    {
                                        this.state.kinderen.map((option, key) => {
                                            return (
                                                <option key={key} value={option.idkind}>{option.voornaam} {option.naam}</option>
                                            );
                                        })
                                    }
                                </select>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.postData} color="primary">Opslaan</Button>
                        <Button onClick={this.toggle}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.error} toggle={this.toggleError}>
                    <ModalHeader><i className="fa fa-warning"></i> Foutmelding</ModalHeader>
                    <ModalBody>
                        <p>Er ging iets mis bij het inschrijven van uw kind</p>
                        <p>Probeer het later opnieuw</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggleError}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default RegisterKind;