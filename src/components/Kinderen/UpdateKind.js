import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip } from 'reactstrap';
import axios from 'axios';

class UpdateKind extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            error: false,
            naam: "",
            voornaam: "",
            dafi: 0,
            zwemmen: 0,
            sport: 0,
            gebdatum: "",
            opmerking: "",
            tooltipOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.tooltipToggle = this.tooltipToggle.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.updateKind = this.updateKind.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onVoornaamChange = this.onVoornaamChange.bind(this);
        this.onGebdatumChange = this.onGebdatumChange.bind(this);
        this.onDafiChange = this.onDafiChange.bind(this);
        this.onZwemmenChange = this.onZwemmenChange.bind(this);
        this.onSportChange = this.onSportChange.bind(this);
        this.onOpmerkingChange = this.onOpmerkingChange.bind(this);
        this.convertBooleanToByte = this.convertBooleanToByte.bind(this);
        this.loadKind = this.loadKind.bind(this);
        this.convertByteToBoolean = this.convertByteToBoolean.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    tooltipToggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    toggleError() {
        this.setState({
            error: !this.state.error
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

    onGebdatumChange(event) {
        this.setState({
            gebdatum: event.target.value
        });
    }

    onDafiChange(event) {
        this.setState({
            dafi: event.target.checked
        });
    }

    onZwemmenChange(event) {
        this.setState({
            zwemmen: event.target.checked
        });
    }

    onSportChange(event) {
        this.setState({
            sport: event.target.checked
        });
    }

    onOpmerkingChange(event) {
        this.setState({
            opmerking: event.target.value
        });
    }

    convertBooleanToByte(param) {
        if (param) {
            return 1;
        }
        return 0;
    }

    convertByteToBoolean(param) {
        if (param === 1) return "true";
        return "false";
    }

    updateKind() {
        axios.put('https://medicamp-so.appspot.com/api/kind/' + this.props.idkind, {
            idkind: this.props.idkind,
            naam: this.state.naam,
            voornaam: this.state.voornaam,
            gebdatum: this.state.gebdatum,
            dafi: this.convertBooleanToByte(this.state.dafi),
            zwemmen: this.convertBooleanToByte(this.state.zwemmen),
            sport: this.convertBooleanToByte(this.state.sport),
            opmerking: this.state.opmerking
        })
            .then((response) => {
                this.toggle();
            })
            .catch((error) => {
                this.toggleError();
            });
    }

    loadKind() {
        axios.get('https://medicamp-so.appspot.com/api/kind/' + this.props.idkind)
            .then((response) => {
                this.setState({
                    naam: response.data.naam,
                    voornaam: response.data.voornaam,
                    gebdatum: response.data.gebdatum,
                    dafi: this.convertByteToBoolean(response.data.dafi),
                    zwemmen: this.convertByteToBoolean(response.data.zwemmen),
                    sport: this.convertByteToBoolean(response.data.sport),
                    opmerking: response.data.opmerking
                });
            });
    }

    componentDidMount() {
        this.loadKind();
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} color="warning" style={{ cursor: 'pointer' }} id={'update'+this.props.idkind}><i className="fa fa-edit"></i></Button>
                <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={'update'+this.props.idkind} toggle={this.tooltipToggle}>
                    bewerken
                </Tooltip>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.voornaam} {this.state.naam} bewerken</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="voornaam">Voornaam</Label>
                                <Input type="text" name="voornaam" id="voornaam" value={this.state.voornaam} onChange={this.onVoornaamChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="gebdatum">Geboortedatum</Label>
                                <Input type="date" name="gebdatum" id="gebdatum" value={this.state.gebdatum} onChange={this.onGebdatumChange} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="zwemmen" id="zwemmen" checked={this.state.zwemmen} onChange={this.onZwemmenChange} /> Uw kind kan zwemmen
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="sport" id="sport" checked={this.state.sport} onChange={this.onSportChange} /> Uw kind kan deelnemen aan sport en spel, aangepast aan zijn/haar leeftijd
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="dafi" id="dafi" checked={this.state.dafi} onChange={this.onDafiChange} /> De leiding mag uw kind medicatie toedienen die vrij te verkrijgen is bij een apotheker
                                </Label>
                            </FormGroup>
                            <FormGroup inline>
                                <Label for="opmerking">Opmerkingen</Label>
                                <Input type="textarea" name="opmerking" id="opmerking" value={this.state.opmerking} onChange={this.onOpmerkingChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateKind} style={{ cursor: 'pointer' }}>Opslaan</Button>
                        <Button onClick={this.toggle} style={{ cursor: 'pointer' }}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.error} toggle={this.toggleError}>
                    <ModalHeader color="warning"><i className="fa fa-exclamation-triangle"></i> Foutmelding</ModalHeader>
                    <ModalBody>
                        <p>Er ging iets mis bij het bewerken van uw kind.</p>
                        <p>Controleer de in te vullen velden en probeer het opnieuw.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggleError} style={{ cursor: 'pointer' }}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

export default UpdateKind;