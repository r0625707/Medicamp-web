import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class UpdateMedicatie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idkind: this.props.idkind,
            modal: false,
            naam: null,
            opmerking: ""
        };
        this.toggle = this.toggle.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onOpmerkingChange = this.onOpmerkingChange.bind(this);
        this.update = this.update.bind(this);

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

    onOpmerkingChange(event) {
        this.setState({
            opmerking: event.target.value
        });
    }

    update() {
        axios.put("https://medicamp-so.appspot.com/api/medicatie/" + this.props.idmedicatie, {
            naam: this.state.naam,
            opmerking: this.state.opmerking
        }, this.headers)
            .then((response) => {
                this.toggle();
            });
    }

    componentDidMount() {
        this.setState({
            naam: this.props.naam,
            opmerking: this.props.opmerking
        });
    }

    render() {
        return (
            <div>
                <Button color="warning" onClick={this.toggle}><i className="fa fa-edit"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Medicatie bewerken</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} placeholder="Naam van het dieet" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="opmerking">Opmerking</Label>
                                <Input type="textarea" name="opmerking" id="opmerking" value={this.state.opmerking} onChange={this.onOpmerkingChange} placeholder="Opmerkingen bij de medicatie" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.update}>Opslaan</Button>
                        <Button onClick={this.toggle}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default UpdateMedicatie;