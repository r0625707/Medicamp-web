import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table, Button
} from 'reactstrap';
import axios from 'axios';

class GroepCard extends React.Component {

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

        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.login + "/groep", this.headers)
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

        if (this.props.role === -1 || this.props.role === 2 || this.props.role === 1) {
            return null;
        }

        return (
            <Col xs="12" sm="12" md="6" lg="3">
                <Card>
                    <CardHeader>
                        Groepen
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
                        <Button color="success">+</Button>
                    </CardFooter>
                </Card>
            </Col>
        );
    }

}

export default GroepCard;