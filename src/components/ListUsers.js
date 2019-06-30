import React, {Component} from 'react'
import axios from 'axios'
import User from './includes/User'
class ListUsers extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

componentWillMount() {
    this.getUsers()
}
    
    getUsers() {
        axios.get('http://localhost:3000/users').then(response => {
            this.setState({users: response.data})
        })
    }
    render() {
        const users = this.state.users.map((user, i) => {
            return(
                <User key={user.id} user={user}/>
            )
        })
        return (
                <div>
                   <h1>Пользователи</h1>
                   <ul className="collection">
                        {users}
                   </ul>
                </div>
        )
    }
}
export default ListUsers