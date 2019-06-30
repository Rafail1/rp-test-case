import React, {Component}from 'react'
import {Link} from 'react-router-dom'

class User extends Component {
    constructor(props){

super(props)
this.state = {
    user:props.user
}
    }
    render(){
        return (
            <li className="collection-item">
            <Link to={`/users/${this.state.user.id}`}>{this.state.user.fio}</Link>
            </li>
        )
    }
}

export default User