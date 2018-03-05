import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import KindForm from '../Kinderen/KindForm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import KoppelVoogd from './KoppelVoogd';
import UpdateKind from './UpdateKind';
import DeleteKind from './DeleteKind';

class KindCard extends React.Component {

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
        axios.get("https://medicamp-so.appspot.com/api/user/" + localStorage.getItem('login') + "/kind", this.headers)
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

        if (localStorage.getItem('role')[1] === '0' || localStorage.getItem('role')[1] === '3') {
            return null;
        }

        return (
            <Col xs="12" sm="12" md="6" lg="3">
                <Card>
                    <CardHeader>
                        <Link to={'/profile/kind'}><b>Kinderen</b></Link>
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover>
                            <tbody>{this.state.data.map((row, key) => {
                                return (
                                    <tr key={key}>
                                        <td><Link to={'/profile/kind/' + row.idkind}><i className="fa fa-arrow-right"></i></Link></td>
                                        <td>{row.voornaam} {row.naam}</td>
                                        <td><KoppelVoogd idkind={row.idkind} login={this.props.login} /></td>
                                        <td><UpdateKind idkind={row.idkind} /></td>
                                        <td><DeleteKind idkind={row.idkind} voornaam={row.voornaam} naam={row.naam} id={row.idkind} /></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <KindForm login={this.props.login} />
                    </CardFooter>
                </Card>
                    <br />
            </Col>
        );
    }

}

export default KindCard;