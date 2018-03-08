import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

class MedicatieOverviewTak extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idkind: null,
            data: [],
            kind: {},
            groep: {},
            tak: {},
            loadingData: true,
            loadingKind: true
        };
        this.headers = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.loadData = this.loadData.bind(this);
        this.loadGroep = this.loadGroep.bind(this);
        this.loadTak = this.loadTak.bind(this);
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/kind/+" + this.props.match.params.idkind + "/medicatie", this.headers)
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

    componentDidMount() {
        this.setState({
            idkind: this.props.match.params.idkind
        });
        this.loadData();
        this.loadGroep();
        this.loadTak();
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
                            <BreadcrumbItem><Link to='/profile/'>{localStorage.getItem('voornaam')} {localStorage.getItem('naam')}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={'/profile/groep/' + this.props.match.params.idgroep}>{this.state.groep.naam}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={'/profile/groep/' + this.props.match.params.idgroep + '/tak/' + this.props.match.params.idtak}>{this.state.tak.naam}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={'/profile/groep/' + this.props.match.params.idgroep + '/tak/' + this.props.match.params.idtak + '/kind/' + this.state.kind.idkind}>{this.state.kind.voornaam} {this.state.kind.naam}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Medicatie</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12">
                        <h2>Medicatie van {this.state.kind.voornaam} {this.state.kind.naam}</h2><hr />
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
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                        <br />
                    </Col>
                </Row>
            </div >
        );
    }

}

export default MedicatieOverviewTak;