import React from 'react';
import axios from 'axios';
import { ListGroupItem, Modal, ModalHeader, ModalFooter, ModalBody, Button } from 'reactstrap';

class TakItem extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            modal: false,
            users: []
        }
        this.headers={
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.loadUsers = this.loadUsers.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    loadUsers() {
        axios.get("https://medicamp-so.appspot.com/api/tak/"+this.props.idtak+"/leiding", this.headers)
        .then((response) => {
            this.setState({
                users: response.data
            });
        });
    }

    componentDidMount() {
        this.loadUsers();
    }

    render() {
        return(
            <div>
                <ListGroupItem onClick={this.toggle} style={{'cursor':'pointer'}}>{this.props.naam}</ListGroupItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.props.naam}</ModalHeader>
                    <ModalBody>
                        <p>{this.props.omschrijving}</p>
                        <ul>
                            {
                                this.state.users.map((item, key) => {
                                    return(
                                        <li key={key}>{item.voornaam} {item.naam}, <a href={'mailto:'+item.login}>{item.login}</a>  {item.tel}</li>
                                    );
                                })
                            }
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

export default TakItem;