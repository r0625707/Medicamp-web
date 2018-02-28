import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class KindOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            user: {},
            kinderen: [],
            loadingUser: true,
            loadingKinderen: true
        });
        this.loadKinderen = this.loadKinderen.bind(this);
        this.loadUser = this.loadUser.bind(this);
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
        axios.get("https://medicamp-so.appspot.com/api/user/" + this.props.match.params.login + "/")
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

    render() {

        while (this.state.loadingKinderen && this.state.loadingUser) {
            return (
                <div>Loading...</div>
            );
        }

        return (
            <div>
                <Breadcrumb>
                    <BreadcrumbItem><Link to={'/profile/' + this.props.match.params.login}>{this.state.user.voornaam} {this.state.user.naam}</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Kinderen</BreadcrumbItem>
                </Breadcrumb>

            </div>
        );
    }

}

export default KindOverview;