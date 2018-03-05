import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import axios from 'axios';
import DieetForm from './DieetForm';

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
        axios.get("https://medicamp-so.appspot.com/api/kind/"+this.props.idkind+"/dieet", this.headers)
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
        return(
            <Col xs="12" sm="12" md="6" lg="3">
                <Card>
                    <CardHeader>
                        Dieeten
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
                        <DieetForm idkind={this.props.idkind} />
                    </CardFooter>
                </Card>
                <br />
            </Col>
        )
    }

}

export default DieetCard;