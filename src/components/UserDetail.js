import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
class UserDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details:null
        }
    }

    getUser() {
        let userId = this.props.match.params.id
        axios.get(`http://localhost:3000/users/${userId}`).then(response => {
            this.setState({details: response.data}, () => {
                console.log(this.state)
            })
        })
        .catch(err => console.log(err))
    }
    componentWillMount(){
        this.getUser()
    }
    onDelete(){
        let userId = this.state.details.id;
        axios.delete(`http://localhost:3000/users/${userId}`)
        .then(response => {
            this.props.history.push('/')
        }).catch(err => console.log(err));
    }
    render(){
        if(!this.state.details) {
            return <div>
                Loading...
            </div>
        }
        return(
            <div>
                <br />
                <Link className="btn grey" to="/">Back</Link>
                <h1>{this.state.details.first_name}</h1>
                <ul className="collection">
                    <li className="collection-item">First Name: {this.state.details.first_name}</li>
                    <li className="collection-item">Last Name: {this.state.details.last_name}</li>
                    <li className="collection-item">Second Name: {this.state.details.second_name}</li>
                    <li className="collection-item">Address: {this.state.details.address}</li>
                    <li className="collection-item">City: {this.state.details.city}</li>
                    <li className="collection-item">Birthday: {new Date(this.state.details.birthday).toLocaleDateString()}</li>
                    <li className="collection-item">Phone: {this.state.details.phone}</li>
                </ul>
                <Link className="btn" to={`/users/edit/${this.state.details.id}`}>Edit</Link>
                <button onClick={this.onDelete.bind(this)} className="btn red right">Delete</button>
            </div>
        )
    }
}
export default UserDetail