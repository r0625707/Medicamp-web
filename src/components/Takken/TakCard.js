import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table, Button
} from 'reactstrap';
import axios from 'axios';

class TakCard extends React.Component {

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
        axios.get("https://medicamp-so.appspot.com/api/user/" + localStorage.getItem('login') + "/tak", this.headers)
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

        if(localStorage.getItem('role')[1] === '0' || localStorage.getItem('role')[1] === '2' || localStorage.getItem('role')[1] === '1') {
            return null;
        }

        return (
            <Col xs="12" sm="12" md="6" lg="3">
                <Card>
                    <CardHeader>
                        Takken
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
                    </CardFooter>
                </Card>
            </Col>
        );
    }

}

export default TakCard;