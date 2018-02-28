import React from 'react';
import { Button, Popover, PopoverBody } from 'reactstrap';
import axios from 'axios';

class DeleteUser extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    delete() {
        axios.delete("https://medicamp-so.appspot.com/api/user/" + this.props.login+"/")
        .then(this.toggle);
    }

    render() {
        return(
            <div>
                <Button color="danger" onClick={this.toggle} id={'Popover' + this.props.id} style={{cursor:'pointer'}}><i class="fa fa-trash"></i></Button>
                <Popover placement="top" isOpen={this.state.popoverOpen} target={'Popover' + this.props.id} toggle={this.toggle}>
                    <PopoverBody>
                        {this.props.voornaam} {this.props.naam} verwijderen? <br />
                        <Button color="success" onClick={this.delete}>Ja</Button>
                        <Button onClick={this.toggle}>Nee</Button>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default DeleteUser;