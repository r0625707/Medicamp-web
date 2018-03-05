import React from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import DeleteUser from './DeleteUser';
import UpdateForm from './UpdateForm';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            data: [],
            token: ""
        };
        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        axios.get('https://medicamp-so.appspot.com/api/user', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then( (response) => {
                this.setState({
                    data: response.data
                });
            });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return(
            <div>
                <h2>Users bij Medicamp</h2>
                <Table responsive striped>
                <thead>
                    <tr>
                        <th>naam</th>
                        <th>voornaam</th>
                        <th>email</th>
                        <th>tel.</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{this.state.data.map(function(row, key) {

                    return (
                        <tr key={key}>
                            <td>{row.naam}</td>
                            <td>{row.voornaam}</td>
                            <td>{row.login}</td>
                            <td>{row.tel}</td>
                            <td>
                                <UpdateForm login={row.login} />  
                            </td>
                            <td>
                                <DeleteUser naam={row.naam} voornaam={row.voornaam} id={key} />
                            </td>
                        </tr>
                    )

                })}</tbody>
                </Table>
            </div>
        );
    }
}

export default UserList;
