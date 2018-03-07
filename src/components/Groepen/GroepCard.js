import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table, Button
} from 'reactstrap';
import axios from 'axios';
import GroepForm from './GroepForm';
import UpdateGroep from './UpdateGroep';
import {Link} from 'react-router-dom';

class GroepCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groep: {}
        };

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get("https://test-dot-medicamp-so.appspot.com/api/user/" + localStorage.getItem('login') + "/groep", this.headers)
            .then((response) => {
                this.setState({
                    groep: response.data[0]
                });
                console.log(response.data[0]);
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {

        if (localStorage.getItem('role')[1] === '0' || localStorage.getItem('role')[1] === '3' || localStorage.getItem('role')[1] === '2') {
            return null;
        }

        return (
            <Col xs="12" sm="12" md="6" lg="3">
                {
                    this.state.groep !== undefined ?
                        <Card>
                            <CardHeader>
                                <Link to={'/profile/groep/'+this.state.groep.idgroep} ><b>{this.state.groep.naam}</b></Link>
                            </CardHeader>
                            <CardBody>
                                <p>{this.state.groep.email}</p>
                                <p>{this.state.groep.straat} {this.state.groep.huisnr}{this.state.groep.bus}, {this.state.groep.postcode} {this.state.groep.plaats}</p>
                                <p><a href={this.state.groep.link} target="_blank">Link</a></p>
                            </CardBody>
                            <CardFooter>
                                <UpdateGroep idgroep={this.state.groep.idgroep}
                                    email={this.state.groep.email}
                                    straat={this.state.groep.straat}
                                    huisnr={this.state.groep.huisnr}
                                    bus={this.state.groep.bus}
                                    postcode={this.state.groep.postcode}
                                    plaats={this.state.groep.plaats}
                                    link={this.state.groep.link} />
                            </CardFooter>
                        </Card>
                        :
                        <GroepForm />
                }
                <br />
            </Col>
        );
    }

}

export default GroepCard;