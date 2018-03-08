import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class UpdateZiekte extends React.Component {

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
        this.onBehandelingChange = this.onBehandelingChange.bind(this);
        this.onSymptomenChange = this.onSymptomenChange.bind(this);
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

    onBehandelingChange(event) {
        this.setState({
            behandeling: event.target.value
        });
    }

    onSymptomenChange(event) {
        this.setState({
            symptomen: event.target.value
        });
    }

    update() {
        axios.put("https://medicamp-so.appspot.com/api/ziekte/"+this.props.idziekte, {
            naam: this.state.naam,
            symptomen: this.state.symptomen,
            behandeling: this.state.behandeling
        }, this.headers)
        .then((response) => {
            this.toggle();
        });
    }

    componentDidMount() {
        this.setState({
            naam: this.props.naam,
            symptomen: this.props.symptomen,
            behandeling: this.props.behandeling
        })
    }

    render() {
        if(this.props.tak) {
            return null;
        }
        
        return(
            <div>
                <Button color="warning" onClick={this.toggle}><i className="fa fa-edit"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Aandoening bewerken</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} placeHolder="Naam van de aandoening" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="symptomen">Symptomen</Label>
                                <Input type="textarea" name="symptomen" id="symptomen" value={this.state.symptomen} onChange={this.onSymptomenChange} placeHolder="Symptomen van de aandoening" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="behandeling">Behandeling</Label>
                                <Input type="textarea" name="behandeling" id="behandeling" value={this.state.behandeling} onChange={this.onBehandelingChange} placeHolder="Standaard behandeling die de leiding kan toedienen bij het optreden van de symptomen" />
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

export default UpdateZiekte;