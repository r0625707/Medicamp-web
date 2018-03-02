import React from 'react';
import {
    Card, CardBody, Col,
    CardHeader, CardFooter, Table
} from 'reactstrap';
import axios from 'axios';
import VoogdForm from './VoogdForm';

class VoogdCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        var link;
        switch(this.props.for) {
            case "kind":
                link = "https://medicamp-so.appspot.com/api/kind/"+this.props.id+"/voogd";
                break;
            case "user":
                link = "https://medicamp-so.appspot.com/api/user/"+this.props.id+"/voogd";
                break;
            default:
                link="";
        }
        axios.get(link)
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
                        Contactpersonen
                    </CardHeader>
                    <CardBody>
                        <Table responsive hover>
                            <tbody>{this.state.data.map(function (row, key) {
                                return (
                                    <tr key={key}>
                                        <td>{row.voornaam} {row.naam}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <VoogdForm login={this.props.login}/>
                    </CardFooter>
                </Card>
            </Col>
        );
    }

}

export default VoogdCard;