import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Tooltip } from 'reactstrap';
import axios from 'axios';


class KoppelVoogd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            voogden: [],
            kind: {},
            idvoogd: "",
            tooltipOpen: false
        }
        this.loadKind = this.loadKind.bind(this);
        this.loadVoogden = this.loadVoogden.bind(this);
        this.toggle = this.toggle.bind(this);
        this.postData = this.postData.bind(this);
        this.onVoogdChange = this.onVoogdChange.bind(this);
        this.tooltipToggle = this.tooltipToggle.bind(this);
    }

    loadVoogden() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.login + "/voogd")
            .then((response) => {
                this.setState({
                    voogden: response.data
                });
            });
    }

    loadKind() {
        axios.get("https://medicamp-so.appspot.com/api/kind/" + this.props.idkind)
            .then((response) => {
                this.setState({
                    kind: response.data
                });
            });
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

    onVoogdChange(event) {
        this.setState({
            idvoogd: event.target.value
        });
    }

    postData() {
        axios.post("https://medicamp-so.appspot.com/api/kind/" + this.props.idkind + "/voogd/" + this.state.idvoogd)
            .then((response) => {
                this.toggle();
            })
    }

    componentDidMount() {
        this.loadKind();
        this.loadVoogden();
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle} id={'koppel'+this.props.idkind}><i className="fa fa-user-plus"></i></Button>
                <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={'koppel'+this.props.idkind} toggle={this.tooltipToggle}>
                    contact koppelen
                </Tooltip>
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader>Contact koppelen aan {this.state.kind.voornaam}</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup tag="fieldset">
                                <legend>Contactpersonen</legend>
                                <select
                                    value={this.state.idvoogd}
                                    onChange={this.onVoogdChange}
                                >
                                    <option value="" disabled>Selecteer een contact... </option>
                                {this.state.voogden.map((option, key) => {
                                    return (
                                        <option value={option.idvoogd} key={key}>{option.voornaam} {option.naam}</option>
                                    )
                                })}
                                </select>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.postData}>Koppelen</Button>
                        <Button onClick={this.toggle}>Annuleren</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default KoppelVoogd;