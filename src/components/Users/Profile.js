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
            loading: true
        };
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + localStorage.getItem('login') + "/", {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then((response) => {
            this.setState({
                data: response.data
            });
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

        while (this.state.loading) {
            return (
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
                    </Col>
                </Row>
                <Row>
                    <GroepCard />
                    <TakCard />
                    <KindCard />
                    <VoogdCard role={this.state.role} for="user" />
                </Row>
            </div>
        );
    }
}

export default Profile;