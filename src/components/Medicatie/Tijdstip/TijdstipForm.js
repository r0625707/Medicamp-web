import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Modal, ModalHeader, ModalFooter, ModalBody, Input, Label } from 'reactstrap';
import Timestamp from 'react-timestamp';

class TijdstipForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            error: false,
            data: [],
            tijdstip: "",
            dosis: null
        }
        this.headers = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.toggle = this.toggle.bind(this);
        this.loadData = this.loadData.bind(this);
        this.onDosisChange = this.onDosisChange.bind(this);
        this.onTijdstipChange = this.onTijdstipChange.bind(this);
        this.postData = this.postData.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/medicatie/" + this.props.idmedicatie, this.headers)
            .then((response) => {
                this.setState({
                    data: response.data.tijdstippen
                });
            });
    }

    onTijdstipChange(event) {
        var formatted = "";
        var tijdstip = event.target.value;
        //yyyy-MM-ddThh:mm
        var y = tijdstip.slice(0,4);
        var mo = tijdstip.slice(5,7);
        var d = tijdstip.slice(8,10);
        var h = tijdstip.slice(11,13);
        var mi = tijdstip.slice(14);
        formatted += d + "/" + mo + "/" + y + " " + h + ":" + mi
        this.setState({
            tijdstip: formatted
        });
    }

    onDosisChange(event) {
        this.setState({
            dosis: event.target.value
        });
    }

    componentDidMount() {
        this.loadData();
    }

    postData() {
        axios.post("https://medicamp-so.appspot.com/api/tijdstip/"+this.props.idmedicatie, {
            tijdstip: this.state.tijdstip,
            dosis: this.state.dosis
        }, this.headers)
        .then((response) => {
            this.loadData();
        });
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}><i className="fa fa-calendar"></i></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Tijdstippen</ModalHeader>
                    <ModalBody>
                        <ul>
                            {
                                this.state.data.map((item, key) => {
                                    return (
                                        <li key={key}>
                                            {item.tijdstip}, {item.dosis}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <hr />
                        <Form>
                            <FormGroup>
                                <Label for="tijdstip">Tijdstip</Label>
                                <Input type="datetime-local" name="tijdstip" id="tijdstip" onChange={this.onTijdstipChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="dosis">Dosis</Label>
                                <Input type="text" name="dosis" id="dosis" value={this.state.dosis} onChange={this.onDosisChange} />
                            </FormGroup>
                        </Form>
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

export default TijdstipForm;