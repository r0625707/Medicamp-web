import React from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import VoogdForm from './VoogdForm';
import Loading from '../Loading';
import UpdateVoogd from './UpdateVoogd';
import DeleteVoogd from './DeleteVoogd';

class VoogdOverviewUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idkind: null,
            data: [],
            loadingData: true
        };
        this.headers = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get("https://medicamp-so.appspot.com/api/user/" + localStorage.getItem('login') + "/voogd", this.headers)
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
    }

    componentDidMount() {
        this.loadData();
    }

    render() {

        while (this.state.loadingData) {
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
                            <BreadcrumbItem active>Contactpersonen</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12">
                        <h2>Uw Contactpersonen</h2><hr />
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
                                                <p><DeleteVoogd for="user" idvoogd={row.idvoogd} naam={row.naam} voornaam={row.voornaam} /></p>
                                            </ListGroupItemText>
                                        </ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                        <br />
                        <VoogdForm for="user" id={this.props.match.params.idkind} />
                    </Col>
                </Row>
            </div >
        );
    }

}

export default VoogdOverviewUser;