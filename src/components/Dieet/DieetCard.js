import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import axios from 'axios';

class DieetCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/kind/"+this.props.idkind+"/dieet")
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
                        
                    </CardFooter>
                </Card>
            </Col>
        )
    }

}

export default DieetCard;