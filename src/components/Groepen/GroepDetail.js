import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';
import TakForm from '../Takken/TakForm';

class GroepDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            groep: {},
            takken: []
        }
        this.headers = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/groep/" + this.props.match.params.idgroep, this.headers)
            .then((response) => {
                this.setState({
                    groep: response.data
                });
            });

        axios.get("https://medicamp-so.appspot.com/api/groep/" + this.props.match.params.idgroep + "/tak", this.headers)
            .then((response) => {
                this.setState({
                    takken: response.data
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs="12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/profile'>{localStorage.getItem('voornaam')} {localStorage.getItem('naam')}</Link></BreadcrumbItem>
                            <BreadcrumbItem active tag="span">{this.state.groep.naam}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="6" lg="6">
                        <h2>{this.state.groep.naam}</h2>
                        <p><a href={'mailto:' + this.state.groep.email}>{this.state.groep.email}</a></p>
                        <p>{this.state.groep.straat} {this.state.groep.huisnr}{this.state.groep.bus}, {this.state.groep.postcode} {this.state.groep.plaats}</p>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6">
                        <h3>Afdelingen</h3>
                        <ListGroup>
                            {
                                this.state.takken.map((item, key) => {
                                    return (
                                        <ListGroupItem key={key}>
                                            <ListGroupItemHeading>{item.naam}</ListGroupItemHeading>
                                            <ListGroupItemText>
                                                {item.omschrijving}
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    );
                                })
                            }
                        </ListGroup>
                        <TakForm idgroep={this.state.groep.idgroep} />
                    </Col>
                </Row>

            </div>
        );
    }

}

export default GroepDetail;