import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DieetForm from './DieetForm';
import UpdateDieet from './UpdateDieet';
import DeleteDieet from './DeleteDieet';

class DieetCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/kind/" + this.props.idkind + "/dieet", this.headers)
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
        return (
            <Col xs="12" sm="12" md="6" lg="3">
                <Card>
                    <CardHeader>
                        {
                            !this.props.tak &&
                            <Link to={'/profile/kind/'+this.props.idkind+'/dieet'}><b>Dieeten</b></Link>
                        }
                        {
                            this.props.tak &&
                            <Link to={'/profile/groep/'+this.props.idgroep+'/tak/'+this.props.idtak+'/kind/'+this.props.idkind+'/dieet'}><b>Dieeten</b></Link>
                        }
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover>
                            <tbody>{this.state.data.map((row, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{row.naam}</td>
                                        <td><UpdateDieet iddieet={row.iddieet}
                                            naam={row.naam}
                                            omschrijving={row.opmerking}
                                            tak={this.props.tak} /></td>
                                        <td><DeleteDieet iddieet={row.iddieet} naam={row.naam} tak={this.props.tak} /></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        {
                            !this.props.tak &&
                            <DieetForm idkind={this.props.idkind} />
                        }
                    </CardFooter>
                </Card>
                <br />
            </Col>
        )
    }

}

export default DieetCard;