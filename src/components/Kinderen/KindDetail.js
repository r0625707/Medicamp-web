import React from 'react';
import { Breadcrumb, BreadcrumbItem} from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
        axios.get("https://medicamp-so.appspot.com/api/user/"+this.props.match.params.login+"/")
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
        axios.get("https://medicamp-so.appspot.com/api/kind/"+this.props.match.params.idkind+"/")
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

    render() {

        while(this.state.loadingKind && this.state.loadingUser) {
            return(
                <div>Loading...</div>
            );
        }

        return(
            <div>
                <Breadcrumb>
                    <BreadcrumbItem><Link to={'/profile/'+this.state.user.login}>{this.state.user.voornaam} {this.state.user.naam}</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={'/profile/'+this.state.user.login+'/kind'}>Kinderen</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.state.kind.voornaam} {this.state.kind.naam}</BreadcrumbItem>
                </Breadcrumb>
            </div>
        );
    }
}

export default KindDetail;