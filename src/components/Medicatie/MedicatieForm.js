import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class MedicatieForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            idkind: this.props.idkind,
            modal: false,
            naam: null,
            opmerking: ""
        };
        this.toggle = this.toggle.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onOpmerkingChange = this.onOpmerkingChange.bind(this);
        this.postData = this.postData.bind(this);
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

    onOpmerkingChange(event) {
        this.setState({
            opmerking: event.target.value
        });
    }

    postData() {
        axios.post("https://medicamp-so.appspot.com/api/medicatie/kind/"+this.props.idkind, {
            naam: this.state.naam,
            opmerking: this.state.opmerking
        })
        .then((response) => {
            this.toggle();
        });
    }

    render() {
        return(
            <div>
                <Button color="success" onClick={this.toggle}>Toevoegen</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Medicatie toevoegen</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam*</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} placeHolder="Naam van de medicatie" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="opmerking">Opmerking</Label>
                                <Input type="textarea" name="opmerking" id="opmerking" value={this.state.opmerking} onChange={this.onOpmerkingChange} placeHolder="Eventuele opmerkingen bij de medicatie" />
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

export default MedicatieForm;