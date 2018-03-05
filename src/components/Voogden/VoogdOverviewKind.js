import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import VoogdForm from './VoogdForm';
import KoppelVoogd from '../Kinderen/KoppelVoogd';
import Loading from '../Loading';
import UpdateVoogd from './UpdateVoogd';
import DeleteVoogd from './DeleteVoogd';

class VoogdOverviewKind extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idkind: null,
            data: [],
            kind: {},
            loadingData: true,
            loadingKind: true
        };
        this.headers = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/kind/+" + this.props.match.params.idkind + "/voogd", this.headers)
            .then((response) => {
                this.setState({
                    data: response.data
                });
            })
            .then((response) => {
                this.setState({
                    loadingData: false
                });
            });
        if (this.props.match.params.idkind !== null) {
            axios.get("https://medicamp-so.appspot.com/api/kind/" + this.props.match.params.idkind, this.headers)
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
        }
    }

    componentDidMount() {
        this.setState({
            idkind: this.props.match.params.idkind
        });
        this.loadData();
    }

    render() {

        while (this.state.loadingData && this.state.loadingKind) {
            return (
                <Loading />
            );
        }

        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/profile'>{localStorage.getItem('voornaam')} {localStorage.getItem('naam')}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to='/profile/kind'>Kinderen</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={'/profile/kind/' + this.props.match.params.idkind}>{this.state.kind.voornaam} {this.state.kind.naam}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Contactpersonen</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12">
                        <h2>Contactpersonen van {this.state.kind.voornaam} {this.state.kind.naam}</h2><hr />
                        <KoppelVoogd idkind={this.props.match.params.idkind} login={localStorage.getItem('login')} /><br />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="8" lg="8">
                        <ListGroup>
                            {
                                this.state.data.map((row, key) => {
                                    return (
                                        <ListGroupItem key={key}>
                                            <ListGroupItemHeading><h3>{row.voornaam} {row.naam}</h3></ListGroupItemHeading>
                                            <ListGroupItemText>
                                                <p><a href={'mailto:' + row.email}>{row.email}</a></p>
                                                <p>{row.tel}</p>
                                                <p>{row.straat} {row.huisnr}{row.bus}, {row.postcode} {row.plaats}</p>
                                                <p><UpdateVoogd idvoogd={row.idvoogd}
                                                    naam={row.naam}
                                                    voornaam={row.voornaam}
                                                    tel={row.tel}
                                                    straat={row.straat}
                                                    huisnr={row.huisnr}
                                                    bus={row.bus}
                                                    postcode={row.postcode}
                                                    plaats={row.plaats} /></p>
                                                <p><DeleteVoogd for="kind" idvoogd={row.idvoogd} naam={row.naam} voornaam={row.voornaam} idkind={this.props.match.params.idkind} /></p>
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                        <br />
                        <VoogdForm login={this.props.login} for="kind" id={this.props.match.params.idkind} />
                    </Col>
                </Row>
            </div >
        );
    }

}

export default VoogdOverviewKind;