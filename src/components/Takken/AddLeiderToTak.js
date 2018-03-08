import React from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, Label, Input, FormGroup } from 'reactstrap';

class AddLeiderToTak extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            error: false,
            login: null
        };
        this.headers = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.toggle = this.toggle.bind(this);
        this.toggleError = this.toggleError.bind(this);
        this.postData = this.postData.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
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

    onLoginChange(event) {
        this.setState({
            login: event.target.value
        });
    }

    postData() {
        axios.post("https://medicamp-so.appspot.com/api/tak/" + this.props.idtak + "/leiding/" + this.state.login +"/", null, this.headers)
            .then((response) => {
                this.toggle();
            })
            .catch((error) => {
                this.toggleError();
            });
    }

    render() {
        if(localStorage.getItem('role')[1] !== '1'){
            return null;
        }
        return (
            <div>
                <Button onClick={this.toggle} color="primary">Leider toevoegen</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Leider toevoegen - {this.props.naamtak}
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="login">E-mail adres leider</Label>
                                <Input type="email" name="login" id="login" value={this.state.login} onChange={this.onLoginChange} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.postData} color="primary">Opslaan</Button>
                        <Button onClick={this.toggle}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.error} toggle={this.toggleError}>
                    <ModalHeader><i className="fa fa-warning"></i> Foutmelding</ModalHeader>
                    <ModalBody>
                        <p>Er ging iets mis bij het toevoegen van de leider</p>
                        <p>Probeer het later opnieuw</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggleError}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddLeiderToTak;