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
                <Link className="btn grey" to="/">Назад</Link>
                <h1>{this.state.details.fio}</h1>
                <ul className="collection">
                    <li className="collection-item">ФИО: {this.state.details.fio}</li>
                    <li className="collection-item">Адрес: {this.state.details.address}</li>
                    <li className="collection-item">Город: {this.state.details.city}</li>
                    <li className="collection-item">Дата рождения: {new Date(this.state.details.birthday).toLocaleDateString()}</li>
                    <li className="collection-item">Телефон: {this.state.details.phone}</li>
                </ul>
                <Link className="btn" to={`/users/edit/${this.state.details.id}`}>Редактировать</Link>
                <button onClick={this.onDelete.bind(this)} className="btn red right">Удалить</button>
            </div>
        )
    }
}
export default UserDetail