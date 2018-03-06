import React from 'react';
import { Button, Popover, PopoverBody, Tooltip } from 'reactstrap';
import axios from 'axios';

class DeleteZiekte extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.delete = this.delete.bind(this);
        this.tooltipToggle = this.tooltipToggle.bind(this);
        this.state = {
            popoverOpen: false,
            tooltipOpen: false
        };

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    tooltipToggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    delete() {
        axios.delete("https://medicamp-so.appspot.com/api/ziekte/" + this.props.idziekte, this.headers)
        .then(this.toggle);
    }

    render() {
        return(
            <div>
                <Button color="danger" onClick={this.toggle} id={'Popoverziekte' + this.props.idziekte} style={{cursor:'pointer'}}><i className="fa fa-trash"></i></Button>
                <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={'Popoverziekte' + this.props.idziekte} toggle={this.tooltipToggle}>
                    verwijderen
                </Tooltip>
                <Popover placement="top" isOpen={this.state.popoverOpen} target={'Popoverziekte' + this.props.idziekte} toggle={this.toggle}>
                    <PopoverBody>
                        {this.props.naam} verwijderen? <br />
                        <Button color="success" onClick={this.delete}>Ja</Button>{' '}
                        <Button onClick={this.toggle}>Nee</Button>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default DeleteZiekte;