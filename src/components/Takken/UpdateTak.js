import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios from 'axios';

class UpdateTak extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            naam: "",
            omschrijving: "",
            modal: false,
            error: false
        };
        this.headers={
            headers:{
                'Authorization': localStorage.getItem('token')
            }
        };
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onOmschrijvingChange = this.onOmschrijvingChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.update = this.update.bind(this);
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

    update() {
        axios.put("https://medicamp-so.appspot.com/api/tak/"+this.props.idtak, {
            naam: this.state.naam,
            omschrijving: this.state.omschrijving
        }, this.headers)
        .then((response) => {
            this.toggle()
        })
        .catch((error) => {
            this.toggleError()
        });
    }

    componentDidMount() {
        this.setState({
            naam: this.props.naam,
            omschrijving: this.props.omschrijving
        });
    }

    render() {
        return(
            <div>
                <Button onClick={this.toggle} color="warning"><i className="fa fa-edit"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Afdeling bewerken
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="omschrijving">Omschrijving</Label>
                                <Input type="text" name="omschrijving" id="omschrijving" value={this.state.omschrijving} onChange={this.onOmschrijvingChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.update} color="primary">Opslaan</Button>
                        <Button onClick={this.toggle}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.error} toggle={this.toggleError}>
                    <ModalHeader><i className="fa fa-warning"></i> Foutmelding</ModalHeader>
                    <ModalBody>
                        <p>Er ging iets mis bij het bewerken van de afdeling</p>
                        <p>Controleer de in te vullen velden en probeer het opnieuw</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggleError}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default UpdateTak;