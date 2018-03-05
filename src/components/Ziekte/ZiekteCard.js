import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import axios from 'axios';
import ZiekteForm from './ZiekteForm';

class ZiekteCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/kind/"+this.props.idkind+"/ziekte")
        .then((response) => {
            this.setState({
                data: response.data
            });
        });
    }

    render() {
        return(
            <Col xs="12" sm="12" md="6" lg="3">
                <Card>
                    <CardHeader>
                        Aandoeningen
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover>
                            <tbody>{this.state.data.map(function (row, key) {
                                return (
                                    <tr key={key}>
                                        <td>{row.naam}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <ZiekteForm idkind={this.props.idkind} />
                    </CardFooter>
                </Card>
            </Col>
        )
    }

}

export default ZiekteCard;