import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class UpdateGroep extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            error: false,
            naam: "",
            email: "",
            tel: "",
            straat: "",
            huisnr: null,
            bus: null,
            postcode: "",
            plaats: "",
            link: ""
        }
        this.toggle = this.toggle.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.onNaamChange = this.onNaamChange.bind(this);
        this.onVoornaamChange = this.onVoornaamChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onStraatChange = this.onStraatChange.bind(this);
        this.onHuisnrChange = this.onHuisnrChange.bind(this);
        this.onBusChange = this.onBusChange.bind(this);
        this.onPostcodeChange = this.onPostcodeChange.bind(this);
        this.onPlaatsChange = this.onPlaatsChange.bind(this);
        this.update = this.update.bind(this);
        this.onLinkChange = this.onLinkChange.bind(this);

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
    }

    componentDidMount() {
        this.setState({
            naam: this.props.naam,
            email: this.props.email,
            straat: this.props.straat,
            huisnr: this.props.huisnr,
            bus: this.props.bus,
            postcode: this.props.postcode,
            plaats: this.props.plaats,
            link: this.props.link
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

    onLinkChange(event) {
        this.setState({
            link: event.target.value
        });
    }

    update() {
        axios.put("https://medicamp-so.appspot.com/api/groep/"+this.props.idgroep, {
            naam: this.state.naam,
            voornaam: this.state.voornaam,
            email: this.state.email,
            straat: this.state.straat,
            huisnr: this.state.huisnr,
            bus: this.state.bus,
            postcode: this.state.postcode,
            plaats: this.state.plaats,
            link: this.state.link
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
                <Button onClick={this.toggle} color="warning" style={{ cursor: 'pointer' }}><i className="fa fa-edit"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Groep bewerken</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="naam">Naam</Label>
                                <Input type="text" name="naam" id="naam" value={this.state.naam} onChange={this.onNaamChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">E-mail adres</Label>
                                <Input type="email" name="email" id="email" value={this.state.email} onChange={this.onEmailChange} />
                            </FormGroup>
                            <FormGroup tag="fieldset">
                                <legend>Adres</legend>
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
                            <FormGroup>
                                <Label for="link">Link</Label>
                                <Input type="url" name="link" id="url" value={this.state.link} onChange={this.onLinkChange} placeholder="Url van een website of social media profiel dat relevant is voor jouw groep" />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.postData} style={{ cursor: 'pointer' }}>Opslaan</Button>
                        <Button onClick={this.toggle} style={{ cursor: 'pointer' }}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.error} toggle={this.toggleError}>
                    <ModalHeader color="warning"><i className="fa fa-exclamation-triangle"></i> Foutmelding</ModalHeader>
                    <ModalBody>
                        <p>Er ging iets mis bij het bewerken van de groep.</p>
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

export default UpdateGroep;