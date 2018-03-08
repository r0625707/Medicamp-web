import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ZiekteForm from './ZiekteForm';
import UpdateZiekte from './UpdateZiekte';
import DeleteZiekte from './DeleteZiekte';

class ZiekteCard extends React.Component {

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
        axios.get("https://medicamp-so.appspot.com/api/kind/" + this.props.idkind + "/ziekte", this.headers)
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
                        <Link to={'/profile/kind/'+this.props.idkind+'/ziekte'}><b>Aandoeningen</b></Link>
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover>
                            <tbody>{this.state.data.map((row, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{row.naam}</td>
                                        <td><UpdateZiekte idziekte={row.idziekte}
                                            naam={row.naam}
                                            symptomen={row.symptomen}
                                            behandeling={row.behandeling}
                                            tak={this.props.tak} /></td>
                                            <td><DeleteZiekte naam={row.naam} idziekte={row.idziekte} tak={this.props.tak} /></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        {
                            !this.props.tak &&
                            <ZiekteForm idkind={this.props.idkind} />
                        }
                    </CardFooter>
                </Card>
                <br />
            </Col>
        )
    }

}

export default ZiekteCard;