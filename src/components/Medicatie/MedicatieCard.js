import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MedicatieForm from './MedicatieForm';
import UpdateMedicatie from './UpdateMedicatie';
import DeleteMedicatie from './DeleteMedicatie';

class MedicatieCard extends React.Component {

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
        axios.get("https://medicamp-so.appspot.com/api/kind/" + this.props.idkind + "/medicatie", this.headers)
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
                        <Link to={'/profile/kind/'+this.props.idkind+'/medicatie'}><b>Medicatie</b></Link>
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover>
                            <tbody>{this.state.data.map(function (row, key) {
                                return (
                                    <tr key={key}>
                                        <td>{row.naam}</td>
                                        <td><UpdateMedicatie idmedicatie={row.idmedicatie}
                                            naam={row.naam}
                                            opmerking={row.opmerking} /></td>
                                        <td><DeleteMedicatie idmedicatie={row.idmedicatie} naam={row.naam} /></td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <MedicatieForm idkind={this.props.idkind} />
                    </CardFooter>
                </Card>
                <br />
            </Col>
        )
    }

}

export default MedicatieCard;