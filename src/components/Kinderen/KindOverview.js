import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Table, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import KindForm from './KindForm';
import Loading from '../Loading';

class KindOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            kinderen: [],
            loadingUser: true,
            loadingKinderen: true
        };
        this.loadKinderen = this.loadKinderen.bind(this);
        this.loadUser = this.loadUser.bind(this);
        this.boolToText = this.boolToText.bind(this);
    }

    loadUser() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.match.params.login + "/")
            .then((response) => {
                this.setState({
                    user: response.data,
                });
            })
            .then((response) => {
                this.setState({
                    loadingUser: false
                });
            });
    }

    loadKinderen() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.match.params.login + "/kind")
            .then((response) => {
                this.setState({
                    kinderen: response.data,
                });
            })
            .then((response) => {
                this.setState({
                    loadingKinderen: false
                })
            });
    }

    componentDidMount() {
        this.loadKinderen();
        this.loadUser();
    }

    boolToText(param) {
        if (param) {
            return "Ja";
        }
        return "Nee";
    }

    render() {

        while (this.state.loadingKinderen && this.state.loadingUser) {
            return (
                <Loading />
            );
        }

        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to={'/profile/' + this.props.match.params.login}>{this.state.user.voornaam} {this.state.user.naam}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Kinderen</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="10" lg="10">
                        <h2>Kinderen</h2>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th>Naam</th>
                                    <th>Voornaam</th>
                                    <th>Geboortedatum</th>
                                    <th>Zwemmen?</th>
                                    <th>Sport {'&'} spel?</th>
                                    <th>Medicatie toedienen?</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{this.state.kinderen.map((row, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{row.naam}</td>
                                        <td>{row.voornaam}</td>
                                        <td>{row.gebdatum}</td>
                                        <td>{this.boolToText(row.zwemmen)}</td>
                                        <td>{this.boolToText(row.sport)}</td>
                                        <td>{this.boolToText(row.dafi)}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            })}</tbody>
                        </Table>
                        <KindForm login={this.state.user.login}/>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default KindOverview;