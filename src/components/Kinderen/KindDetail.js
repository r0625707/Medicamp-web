import React from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Table, ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import VoogdCard from '../Voogden/VoogdCard';
import KoppelVoogd from './KoppelVoogd';
import UpdateKind from './UpdateKind';
import DeleteKind from './DeleteKind';
import MedicatieCard from '../Medicatie/MedicatieCard';
import ZiekteCard from '../Ziekte/ZiekteCard';
import DieetCard from '../Dieet/DieetCard';
import TakItem from './TakItem';

class KindDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            kind: {},
            takken: [],
            loadingUser: true,
            loadingKind: true
        };
        this.loadKind = this.loadKind.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.loadTakken = this.loadTakken.bind(this);

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
    }

    loadUser() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.match.params.login + "/", this.headers)
            .then((response) => {
                this.setState({
                    user: response.data
                });
            })
            .then((response) => {
                this.setState({
                    loadingUser: false
                });
            });
        ;
    }

    loadKind() {
        axios.get("https://medicamp-so.appspot.com/api/kind/" + this.props.match.params.idkind + "/", this.headers)
            .then((response) => {
                this.setState({
                    kind: response.data
                });
            })
            .then((response) => {
                this.setState({
                    loadingKind: false
                });
            });
        ;
    }

    loadTakken() {
        axios.get("https://medicamp-so.appspot.com/api/kind/" + this.props.match.params.idkind + "/tak", this.headers)
            .then((response) => {
                this.setState({
                    takken: response.data
                });
            });
    }

    componentDidMount() {
        this.loadKind();
        this.loadUser();
        this.loadTakken();
    }

    boolToText(param) {
        if (param) {
            return "Ja";
        }
        return "Nee";
    }

    render() {

        while (this.state.loadingKind && this.state.loadingUser) {
            return (
                <Loading />
            );
        }

        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/profile/'>{localStorage.getItem('voornaam')} {localStorage.getItem('naam')}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/profile/kind'>Kinderen</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.state.kind.voornaam} {this.state.kind.naam}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="8" lg="6">
                        <h2>{this.state.kind.voornaam} {this.state.kind.naam}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="6" lg="6">
                        <ListGroup>
                            <ListGroupItem>
                                <KoppelVoogd idkind={this.props.match.params.idkind} login={this.props.match.params.login} /> Koppel een contactpersoon aan {this.state.kind.voornaam}
                            </ListGroupItem>
                            <ListGroupItem>
                                <UpdateKind idkind={this.props.match.params.idkind} /> Bewerk de gegevens voor {this.state.kind.voornaam}
                            </ListGroupItem>
                            <ListGroupItem>
                                <DeleteKind idkind={this.props.match.params.idkind} naam={this.state.kind.naam} voornaam={this.state.kind.voornaam} id={this.state.kind.idkind} /> Verwijder de gegevens van {this.state.kind.voornaam}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6">
                        <h3>Info</h3>
                        <Table responsive bordered>
                            <tbody>
                                <tr>
                                    <td>Geboortedatum:</td>
                                    <td>{this.state.kind.gebdatum}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.kind.voornaam} kan zwemmen:</td>
                                    <td>{this.boolToText(this.state.kind.zwemmen)}</td>
                                </tr>
                                <tr>
                                    <td>{this.state.kind.voornaam} kan meedoen aan sport en spel afgestemd op zijn/haar leeftijd:</td>
                                    <td>{this.boolToText(this.state.kind.sport)}</td>
                                </tr>
                                <tr>
                                    <td>De leiding mag {this.state.kind.voornaam} vrij te verkrijgen medicatie toedienen indien nodig:</td>
                                    <td>{this.boolToText(this.state.kind.dafi)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs="12" sm="12" md="6" lg="6">
                        <h4>Opmerkingen</h4>
                        <ListGroupItem>{this.state.kind.opmerking}</ListGroupItem>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6">
                        <h4>Afdelingen</h4>
                        <ListGroup>
                            {
                                this.state.takken.map((item, key) => {
                                    return(
                                        <TakItem key={key} idtak={item.idtak} naam={item.naam} omschrijving={item.omschrijving} idkind={this.state.kind.idkind} kindnaam={this.state.kind.naam} voornaam={this.state.kind.voornaam} />
                                    );
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <VoogdCard id={this.props.match.params.idkind} login={localStorage.getItem('login')} for="kind" role={this.state.user.role} />
                    <MedicatieCard idkind={this.props.match.params.idkind} />
                    <ZiekteCard idkind={this.props.match.params.idkind} />
                    <DieetCard idkind={this.props.match.params.idkind} />
                </Row>
            </div>
        );
    }
}

export default KindDetail;