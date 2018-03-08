import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';
import TakForm from '../Takken/TakForm';
import UpdateTak from '../Takken/UpdateTak';
import DeleteTak from '../Takken/VerwijderTak';
import RegisterKind from '../Takken/RegisterKind';

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
                    <Col xs="12" sm="12" md="3" lg="3">

                        <h2>{this.state.groep.naam}</h2>
                        <p><a href={'mailto:' + this.state.groep.email}>{this.state.groep.email}</a></p>
                        <p>{this.state.groep.straat} {this.state.groep.huisnr}{this.state.groep.bus}, {this.state.groep.postcode} {this.state.groep.plaats}</p>
                        <p><a href={this.state.groep.link} target="_blank">Link</a></p>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6">
                        <h3>Afdelingen</h3>
                        <ListGroup>
                            {
                                this.state.takken.map((item, key) => {
                                    return (
                                        <ListGroupItem key={key}>
                                            <ListGroupItemHeading>
                                                {
                                                    (localStorage.getItem('role')[1] === '1' || localStorage.getItem('role')[1] === '3') ?
                                                        <Link to={'/profile/groep/'+this.state.groep.idgroep+'/tak/'+item.idtak}><b>{item.naam}</b></Link>
                                                        :
                                                        <b>{item.naam}</b>
                                                }
                                            </ListGroupItemHeading>
                                            <ListGroupItemText>
                                                <p>{item.omschrijving}</p>
                                                <p><UpdateTak idtak={item.idtak}
                                                    naam={item.naam}
                                                    omschrijving={item.omschrijving} /></p>
                                                <p><DeleteTak idtak={item.idtak} naam={item.naam} /></p>
                                                <p><RegisterKind idtak={item.idtak} naamtak={item.naam} /></p>
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    );
                                })
                            }
                        </ListGroup>
                        <br />
                        <TakForm idgroep={this.state.groep.idgroep} />
                    </Col>
                </Row>

            </div>
        );
    }

}

export default GroepDetail;