import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import axios from 'axios';
import VoogdForm from './VoogdForm';
import UpdateVoogd from './UpdateVoogd';
import DeleteVoogd from './DeleteVoogd';

class VoogdCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.loadData = this.loadData.bind(this);

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
    }

    loadData() {
        var link;
        switch (this.props.for) {
            case "kind":
                link = "https://medicamp-so.appspot.com/api/kind/" + this.props.id + "/voogd";
                break;
            case "user":
                link = "https://medicamp-so.appspot.com/api/user/" + localStorage.getItem('login') + "/voogd";
                break;
            default:
                link = "";
        }
        axios.get(link, this.headers)
            .then((response) => {
                this.setState({
                    data: response.data
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {

        if (this.props.for === "user" && (localStorage.getItem('role')[1] === '0' || localStorage.getItem('role')[1] === '3')) {
            return null;
        }

        return (
            <Col xs="12" sm="12" md="6" lg="3">
                <Card>
                    <CardHeader>
                        <b>Contactpersonen</b>
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover>
                            <tbody>{this.state.data.map((row, key) => {
                                return (
                                    <tr key={key}>
                                        <td></td>
                                        <td>{row.voornaam} {row.naam}</td>
                                        <td><UpdateVoogd idvoogd={row.idvoogd}
                                            naam={row.naam}
                                            voornaam={row.voornaam}
                                            tel={row.tel}
                                            straat={row.straat}
                                            huisnr={row.huisnr}
                                            bus={row.bus}
                                            postcode={row.postcode}
                                            plaats={row.plaats} />
                                        </td>
                                        <td><DeleteVoogd for={this.props.for} idvoogd={row.idvoogd} naam={row.naam} voornaam={row.voornaam} idkind={this.props.id} /></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <VoogdForm login={this.props.login} for={this.props.for} id={this.props.id} />
                    </CardFooter>
                </Card>
                <br />
            </Col>
        );
    }

}

export default VoogdCard;