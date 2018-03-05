import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class DieetForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            idkind: this.props.idkind,
            modal: false,
            naam: null,
            omschrijving: ""
        };
        this.toggle = this.toggle.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onOmschrijvingChange = this.onOmschrijvingChange.bind(this);
        this.postData = this.postData.bind(this);

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    onNaamChange(event) {
        this.setState({
            naam: event.target.value
        });
    }

    onOmschrijvingChange(event) {
        this.setState({
            omschrijving: event.target.value
        });
    }

    postData() {
        axios.post("https://medicamp-so.appspot.com/api/dieet/kind/"+this.props.idkind, {
            naam: this.state.naam,
            omschrijving: this.state.omschrijving
        }, this.headers)
        .then((response) => {
            this.toggle();
        });
    }

    render() {
        return(
            <div>
                <Button color="success" onClick={this.toggle}>Toevoegen</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Dieet toevoegen</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam*</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} placeHolder="Naam van het dieet" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="omschrijving">Omschrijving</Label>
                                <Input type="textarea" name="omschrijving" id="omschrijving" value={this.state.omschrijving} onChange={this.onOmschrijvingChange} placeHolder="Omschrijving van het dieet" />
                            </FormGroup>
                        </Form>
                        <p>* Velden zijn verplicht</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.postData}>Opslaan</Button>
                        <Button onClick={this.toggle}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default DieetForm;