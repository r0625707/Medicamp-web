import React from 'react';
import { Button, Popover, PopoverBody, Tooltip } from 'reactstrap';
import axios from 'axios';

class DeleteVoogd extends React.Component {
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
        var url;
        switch (this.props.for) {
            case "kind":
                url = "https://medicamp-so.appspot.com/api/kind/" + this.props.idkind + "/voogd/" + this.props.idvoogd;
                break
            case "user":
                url = "https://medicamp-so.appspot.com/api/voogd/" + this.props.idvoogd;
                break
            default:
                url="";
        }
        axios.delete(url, this.headers)
            .then(this.toggle);
    }

    render() {

        switch (this.props.for) {
            case "user":
                return (
                    <div>
                        <Button color="danger" onClick={this.toggle} id={'Popovervoogd' + this.props.idvoogd} style={{ cursor: 'pointer' }}><i className="fa fa-trash"></i></Button>
                        <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={'Popovervoogd' + this.props.idvoogd} toggle={this.tooltipToggle}>
                            verwijderen
                        </Tooltip>
                        <Popover placement="top" isOpen={this.state.popoverOpen} target={'Popovervoogd' + this.props.idvoogd} toggle={this.toggle}>
                            <PopoverBody>
                                {this.props.voornaam} {this.props.naam} verwijderen? <br />
                                <Button color="success" onClick={this.delete}>Ja</Button>{' '}
                                <Button onClick={this.toggle}>Nee</Button>
                            </PopoverBody>
                        </Popover>
                    </div>
                )

            case "kind":
                return (
                    <div>
                        <Button color="danger" onClick={this.toggle} id={'Popovervoogd' + this.props.idvoogd}><i className="fa fa-unlink"></i></Button>
                        <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target={'Popovervoogd' + this.props.idvoogd} toggle={this.tooltipToggle}>
                            Loskoppelen
                        </Tooltip>
                        <Popover placement="top" isOpen={this.state.popoverOpen} target={'Popovervoogd' + this.props.idvoogd} toggle={this.toggle}>
                            <PopoverBody>
                                {this.props.voornaam} {this.props.naam} loskoppelen? <br />
                                <Button color="success" onClick={this.delete}>Ja</Button>{' '}
                                <Button onClick={this.toggle}>Nee</Button>
                            </PopoverBody>
                        </Popover>
                    </div>
                )

            default:
                return null;
        }
    }
}

export default DeleteVoogd;