import React from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class GroepList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.headers = {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        };

        this.loadData = this.loadData.bind(this);
    }

    state = {
        data: []
    };

    loadData() {
        axios.get('https://medicamp-so.appspot.com/api/groep', this.headers)
            .then((response) => {
                this.setState({
                    data: response.data
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                {
                    localStorage.getItem('role')[1] === '2' &&
                    <div>
                        <p>Hieronder vindt je alle groepen die zich geregistreerd hebben bij Medicamp</p>
                        <h2>Groepen bij Medicamp</h2>
                        <Table responsive striped>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>naam</th>
                                    <th>adres</th>
                                    <th>email</th>
                                </tr>
                            </thead>
                            <tbody>{this.state.data.map(function (row, key) {

                                return (
                                    <tr key={key}>
                                        <td><Link to={'/profile/groep/' + row.idGroep}><i className="fa fa-arrow-right"></i></Link></td>
                                        <td>{row.naam}</td>
                                        <td>{row.straat} {row.huisnr}{row.bus}, {row.postcode} {row.plaats}</td>
                                        <td>{row.email}</td>
                                    </tr>
                                )

                            })}</tbody>
                        </Table>
                    </div>
                }
            </div>
        );
    }
}

export default GroepList;
