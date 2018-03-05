import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class ZiekteForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            idkind: this.props.idkind,
            modal: false,
            naam: null,
            symptomen: "",
            behandeling: ""
        };
        this.toggle = this.toggle.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onBehandelingChange = this.onOpmerkingChange.bind(this);
        this.onSymptomenChange = this.onSymptomenChange.bind(this);
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

    onBehandelingChange(event) {
        this.setState({
            opmerking: event.target.value
        });
    }

    onSymptomenChange(event) {
        this.setState({
            symptomen: event.target.value
        });
    }

    postData() {
        axios.post("https://medicamp-so.appspot.com/api/ziekte/kind/"+this.props.idkind, {
            naam: this.state.naam,
            symptomen: this.state.symptomen,
            behandeling: this.state.behandeling
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
                    <ModalHeader>Aandoening toevoegen</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam*</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} placeHolder="Naam van de aandoening" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="symptomen">Symptomen</Label>
                                <Input type="textarea" name="symptomen" id="symptomen" value={this.state.symptomen} onChange={this.onSymptomenChange} placeHolder="Symptomen van de aandoening" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="behandeling">Behandeling</Label>
                                <Input type="textarea" name="behandeling" id="behandeling" value={this.state.behandeling} onChange={this.onBehandelingChange} placeHolder="Standaard behandeling die de leiding kan toedieden bij het optreden van de symptomen" />
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

export default ZiekteForm;