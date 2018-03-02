import React from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import axios from 'axios';
import KindCard from '../Kinderen/KindCard';
import VoogdCard from '../Voogden/VoogdCard';
import GroepCard from '../Groepen/GroepCard';
import TakCard from '../Takken/TakCard';
import UpdateForm from './UpdateForm';
import Loading from '../Loading';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            role: "",
            loading: true
        };
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.match.params.login + "/")
            .then((response) => {
                this.setState({
                    data: response.data
                });
                switch(response.data.role){
                    case -1:
                        this.setState({
                            role: "administrator"
                        });
                        break;
                    case 0:
                        this.setState({
                            role: "hoofdleiding"
                        });
                        break;
                    case 1:
                        this.setState({
                            role: "ouder"
                        });
                        break;
                    case 2:
                        this.setState({
                            role: "leiding"
                        });
                        break;
                    default:
                        this.setState({
                            role: ""
                        });
                }
            })
            .then((response) => {
                this.setState({
                    loading: false
                });
            });
            ;
    }

    componentDidMount() {
        this.loadData();
    }

    render() {

        while(this.state.loading) {
            return(
                <Loading />
            );
        }

        return (
            <div>
                <Row>
                    <Col xs="12">
                        <Breadcrumb tag="nav">
                            <BreadcrumbItem active tag="span">{this.state.data.voornaam} {this.state.data.naam}</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="8" lg="6">
                        <h2>{this.state.data.voornaam} {this.state.data.naam} <UpdateForm login={this.props.match.params.login} /></h2>
                        <p>({this.state.role})</p>
                        <p>Email-adres: <a href={'mailto:' + this.state.data.login}>{this.state.data.login}</a></p>
                    </Col>
                </Row>
                <Row>
                    <GroepCard login={this.props.match.params.login} role={this.state.data.role} />
                    <TakCard login={this.props.match.params.login} role={this.state.data.role} />
                    <KindCard login={this.props.match.params.login} role={this.state.data.role} />
                    <VoogdCard id={this.props.match.params.login} login={this.props.match.params.login} role={this.state.data.role} for="user"/>
                </Row>
            </div>
        );
    }
}

export default Profile;