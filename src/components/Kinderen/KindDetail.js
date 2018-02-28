import React from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Table } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

class KindDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            kind: {},
            loadingUser: true,
            loadingKind: true
        };
        this.loadKind = this.loadKind.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    loadUser() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.match.params.login + "/")
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
        axios.get("https://medicamp-so.appspot.com/api/kind/" + this.props.match.params.idkind + "/")
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
                            <BreadcrumbItem><Link to={'/profile/' + this.state.user.login}>{this.state.user.voornaam} {this.state.user.naam}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={'/profile/' + this.state.user.login + '/kind'}>Kinderen</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.state.kind.voornaam} {this.state.kind.naam}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="8" lg="6">
                        <h2>{this.state.kind.voornaam} {this.state.kind.naam}</h2>
                        <Table responsive bordered>
                            <tr>
                                <td>Geboortedatum</td>
                                <td>{this.state.kind.gebdatum}</td>
                            </tr>
                            <tr>
                                <td>{this.state.kind.voornaam} kan zwemmen</td>
                                <td>{this.boolToText(this.state.kind.zwemmen)}</td>
                            </tr>
                            <tr>
                                <td>{this.state.kind.voornaam} kan meedoen aan sport en spel afgestemd op zijn/haar leeftijd</td>
                                <td>{this.boolToText(this.state.kind.sport)}</td>
                            </tr>
                            <tr>
                                <td>De leiding mag {this.state.kind.voornaam} vrij te verkrijgen medicatie toedienen indien nodig</td>
                                <td>{this.boolToText(this.state.kind.dafi)}</td>
                            </tr>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default KindDetail;