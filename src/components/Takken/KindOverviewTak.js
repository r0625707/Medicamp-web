import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, Table, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import DeleteKindFromTak from './DeleteKindFromTak';

class KindOverviewTak extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            kinderen: [],
            groep: {},
            tak: {},
            loadingKinderen: true
        };
        this.loadKinderen = this.loadKinderen.bind(this);
        this.boolToText = this.boolToText.bind(this);
        this.loadGroep = this.loadGroep.bind(this);
        this.loadTak = this.loadTak.bind(this);

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };
    }

    loadKinderen() {
        axios.get("https://medicamp-so.appspot.com/api/tak/" + this.props.match.params.idtak + "/kind", this.headers)
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
        this.loadKinderen();
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
                            <BreadcrumbItem><Link to='/profile'>{localStorage.getItem('voornaam')} {localStorage.getItem('naam')}</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={'/profile/groep/'+this.props.match.params.idgroep}>{this.state.groep.naam}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.state.tak.naam}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12">
                        <h2>Kinderen</h2>
                        <Table striped responsive>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Naam</th>
                                    <th>Voornaam</th>
                                    <th>Geboortedatum</th>
                                    <th>Zwemmen?</th>
                                    <th>Sport {'&'} spel?</th>
                                    <th>Medicatie toedienen?</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>{this.state.kinderen.map((row, key) => {
                                return (
                                    <tr key={key}>
                                        <td><Link to={'/profile/groep/'+this.state.groep.idgroep+'/tak/'+this.state.tak.idtak+'/kind/'+row.idkind}><i className="fa fa-arrow-right"></i></Link></td>
                                        <td>{row.naam}</td>
                                        <td>{row.voornaam}</td>
                                        <td>{row.gebdatum}</td>
                                        <td>{this.boolToText(row.zwemmen)}</td>
                                        <td>{this.boolToText(row.sport)}</td>
                                        <td>{this.boolToText(row.dafi)}</td>
                                        <td><DeleteKindFromTak /></td>
                                    </tr>
                                )
                            })}</tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default KindOverviewTak;