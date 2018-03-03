import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import KindForm from '../Kinderen/KindForm';
import axios from 'axios';
import {Link} from 'react-router-dom';
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
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.login + "/kind")
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

        if(this.props.role === -1 || this.props.role === 2) {
            return null;
        }

        return (
            <Col xs="12" sm="12" md="6" lg="3">
                <Card>
                    <CardHeader>
                        <Link to={'/profile/'+this.props.login+'/kind'}>Kinderen</Link>
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover>
                            <tbody>{this.state.data.map((row, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{row.voornaam} {row.naam}</td>
                                        <td><KoppelVoogd idkind={row.idkind} login={this.props.login}/></td>
                                        <td><UpdateKind idkind={row.idkind} /></td>
                                        <td><DeleteKind idkind={row.idkind} voornaam={row.voornaam} naam={row.naam} id={row.idkind} /></td>
                                        <td><Link to={'/profile/'+this.props.login+'/kind/'+row.idkind}><i className="fa fa-arrow-right"></i></Link></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <KindForm login={this.props.login}/>
                    </CardFooter>
                </Card>
            </Col>
        );
    }

}

export default KindCard;