import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class UpdateDieet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idkind: this.props.idkind,
            modal: false,
            naam: null,
            omschrijving: ""
        };
        this.toggle = this.toggle.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onOmschrijvingChange = this.onOmschrijvingChange.bind(this);
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

    onOmschrijvingChange(event) {
        this.setState({
            omschrijving: event.target.value
        });
    }

    update() {
        axios.put("https://medicamp-so.appspot.com/api/dieet/" + this.props.iddieet, {
            naam: this.state.naam,
            opmerking: this.state.omschrijving
        }, this.headers)
            .then((response) => {
                this.toggle();
            });
    }

    componentDidMount() {
        this.setState({
            naam: this.props.naam,
            omschrijving: this.props.omschrijving
        });
    }

    render() {
        return (
            <div>
                <Button color="warning" onClick={this.toggle}><i className="fa fa-edit"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Dieet bewerken</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} placeHolder="Naam van het dieet" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="omschrijving">Omschrijving</Label>
                                <Input type="textarea" name="omschrijving" id="omschrijving" value={this.state.omschrijving} onChange={this.onOmschrijvingChange} placeHolder="Omschrijving van het dieet" />
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

export default UpdateDieet;