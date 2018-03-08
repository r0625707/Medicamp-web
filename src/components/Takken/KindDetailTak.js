import React from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Table, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import VoogdCard from '../Voogden/VoogdCard';
import MedicatieCard from '../Medicatie/MedicatieCard';
import ZiekteCard from '../Ziekte/ZiekteCard';
import DieetCard from '../Dieet/DieetCard';

class KindDetailTak extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            kind: {},
            groep: {},
            tak: {},
            loadingUser: true,
            loadingKind: true
        };
        this.loadKind = this.loadKind.bind(this);
        this.loadUser = this.loadUser.bind(this);

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

    loadGroep() {
        axios.get("https://medicamp-so.appspot.com/api/groep/" + this.props.match.params.idgroep, this.headers)
            .then((response) => {
                this.setState({
                    groep: response.data
                });
            });
    }

    loadTak() {
        axios.get("https://medicamp-so.appspot.com/api/tak/" + this.props.match.params.idtak, this.headers)
            .then((response) => {
                this.setState({
                    tak: response.data
                });
            });
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

    componentDidMount() {
        this.loadKind();
        this.loadUser();
        this.loadGroep();
        this.loadTak();
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
                            <BreadcrumbItem><Link to={'/profile/groep/'+this.props.match.params.idgroep}>{this.state.groep.naam}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={'/profile/groep/'+this.props.match.params.idgroep+'/tak/'+this.props.match.params.idtak}>{this.state.tak.naam}</Link></BreadcrumbItem>
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
                    <Col xs="12" sm="12" md="4" lg="4">
                        <h4>Opmerkingen</h4>
                        <ListGroupItem>{this.state.kind.opmerking}</ListGroupItem>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <VoogdCard id={this.props.match.params.idkind} idkind={this.props.match.params.idkind} idgroep={this.props.match.params.idgroep} idtak={this.props.match.params.idtak} login={localStorage.getItem('login')} for="kind" tak={true} role={this.state.user.role} />
                    <MedicatieCard idkind={this.props.match.params.idkind} idgroep={this.props.match.params.idgroep} idtak={this.props.match.params.idtak} tak={true} />
                    <ZiekteCard idkind={this.props.match.params.idkind} idgroep={this.props.match.params.idgroep} idtak={this.props.match.params.idtak} tak={true} />
                    <DieetCard idkind={this.props.match.params.idkind} idgroep={this.props.match.params.idgroep} idtak={this.props.match.params.idtak} tak={true} />
                </Row>
            </div>
        );
    }
}

export default KindDetailTak;