import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import DieetForm from './DieetForm';
import Loading from '../Loading';
import UpdateDieet from './UpdateDieet';
import DeleteDieet from './DeleteDieet';

class DieetOverview extends React.Component {

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
        axios.get("https://medicamp-so.appspot.com/api/kind/+" + this.props.match.params.idkind + "/dieet", this.headers)
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
                            <BreadcrumbItem active>Dieeten</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12">
                        <h2>Dieeten van {this.state.kind.voornaam} {this.state.kind.naam}</h2><hr />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="8" lg="8">
                        <ListGroup>
                            {
                                this.state.data.map((row, key) => {
                                    return (
                                        <ListGroupItem key={key}>
                                            <ListGroupItemHeading><h3>{row.naam}</h3></ListGroupItemHeading>
                                            <ListGroupItemText>
                                                <p>{row.opmerking}</p>
                                                <p><UpdateDieet iddieet={row.iddieet}
                                                    naam={row.naam}
                                                    omschrijving={row.opmerking} /></p>
                                                <p><DeleteDieet naam={row.naam} iddieet={row.iddieet} /></p>
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                        <br />
                        <DieetForm idkind={this.props.match.params.idkind} />
                    </Col>
                </Row>
            </div >
        );
    }

}

export default DieetOverview;