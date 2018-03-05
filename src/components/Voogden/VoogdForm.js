import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class VoogdForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            error: false,
            naam: "",
            voornaam: "",
            email: "",
            tel: "",
            straat: "",
            huisnr: null,
            bus: null,
            postcode: "",
            plaats: ""
        }
        this.toggle = this.toggle.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onVoornaamChange = this.onVoornaamChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onTelChange = this.onTelChange.bind(this);
        this.onStraatChange = this.onStraatChange.bind(this);
        this.onHuisnrChange = this.onHuisnrChange.bind(this);
        this.onBusChange = this.onBusChange.bind(this);
        this.onPostcodeChange = this.onPostcodeChange.bind(this);
        this.onPlaatsChange = this.onPlaatsChange.bind(this);
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

    onEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    }

    onTelChange(event) {
        this.setState({
            tel: event.target.value
        });
    }

    onStraatChange(event) {
        this.setState({
            straat: event.target.value
        });
    }

    onHuisnrChange(event) {
        this.setState({
            huisnr: event.target.value
        });
    }

    onBusChange(event) {
        this.setState({
            bus: event.target.value
        });
    }

    onPostcodeChange(event) {
        this.setState({
            postcode: event.target.value
        });
    }

    onPlaatsChange(event) {
        this.setState({
            plaats: event.target.value
        });
    }

    postData() {
        var url;
        switch(this.props.for) {
            case "kind":
                url="https://medicamp-so.appspot.com/api/voogd/"+this.props.login+"/kind/"+this.props.id;
                break
            case "user":
                url="https://medicamp-so.appspot.com/api/voogd/"+this.props.login+"/";
                break
            default:
                url="";
        }
        axios.post(url, {
            naam: this.state.naam,
            voornaam: this.state.voornaam,
            email: this.state.email,
            tel: this.state.tel,
            straat: this.state.straat,
            huisnr: this.state.huisnr,
            bus: this.state.bus,
            postcode: this.state.postcode,
            plaats: this.state.plaats
        }, this.headers)
        .then((response) => {
            this.toggle();
        })
        .catch((response) => {
            this.toggleError();
        });
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} color="success" style={{ cursor: 'pointer' }}>Toevoegen</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Contact toevoegen</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam*</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="voornaam">Voornaam*</Label>
                                <Input type="text" name="voornaam" id="voornaam" value={this.state.voornaam} onChange={this.onVoornaamChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email*</Label>
                                <Input type="email" name="email" id="email" value={this.state.email} onChange={this.onEmailChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="tel">Telefoon* (bij voorkeur GSM nummer)</Label>
                                <Input type="phone" name="tel" id="tel" value={this.state.tel} onChange={this.onTelChange} />
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <legend>Adres*</legend>
                                <FormGroup>
                                    <Label for="straat">Straatnaam</Label>
                                    <Input type="text" name="straat" id="straat" value={this.state.straat} onChange={this.onStraatChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="huisnr">Huisnr.</Label>
                                    <Input type="number" name="huisnr" id="huisnr" value={this.state.huisnr} onChange={this.onHuisnrChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="bus">Bus</Label>
                                    <Input type="text" name="bus" id="bus" value={this.state.bus} onChange={this.onBusChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="postcode">Postcode</Label>
                                    <Input type="text" name="postcode" id="postcode" value={this.state.postcode} onChange={this.onPostcodeChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="plaats">Plaats</Label>
                                    <Input type="text" name="plaats" id="plaats" value={this.state.plaats} onChange={this.onPlaatsChange} />
                                </FormGroup>
                            </FormGroup>
                        </Form>
                        <p>* velden zijn verplicht </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.postData} style={{ cursor: 'pointer' }}>Opslaan</Button>
                        <Button onClick={this.toggle} style={{ cursor: 'pointer' }}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.error} toggle={this.toggleError}>
                    <ModalHeader color="warning"><i className="fa fa-exclamation-triangle"></i> Foutmelding</ModalHeader>
                    <ModalBody>
                        <p>Er ging iets mis bij het aanmaken van de contactpersoon.</p>
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

export default VoogdForm;