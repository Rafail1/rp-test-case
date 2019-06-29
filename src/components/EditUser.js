import React, {Component} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import M from "materialize-css";

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fromYear:new Date().getFullYear() - 70,
            toYear:new Date().getFullYear()
        }
    }
    componentWillMount() {
        this.getUser();
    }
    initSelects() {
        let selects = document.querySelectorAll('select');
        M.FormSelect.init(selects, {});
    }
    editUser(newUser) {
        axios.request({
            method:"patch",
            url: `http://localhost:3000/users/${this.state.id}`, 
            data:newUser,
        }).then(response => {
            this.props.history.push('/')
        })
        .catch(err => console.log(err));
    }
    getUser() {
        let userId = this.props.match.params.id
        axios.get(`http://localhost:3000/users/${userId}`).then(response => {
            response.data.birthday = new Date(response.data.birthday);    
        this.setState(response.data, () => {
            this.initSelects();
            this.setDayItems();
        })
        }, () => {
            console.log(this.state)
        })
        .catch(err => console.log(err))
    }
    handleInputChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }
    setDayItems() {
        const lastDay = new Date(this.state.birthday.getFullYear(), this.state.birthday.getMonth(), 0).getDate();
        if(this.state.dayItems && this.state.dayItems.length === lastDay) {
            return;
        }
        const elements = this.createSelectItems(1, lastDay);
        this.setState({dayItems:elements}, () => {
            let select = document.querySelector(`select[name='day']`);
            M.FormSelect.init(select, {});
        });       
    }
    onDateChange(e) {
        this.setDayItems();
    }
    createSelectItems(from, to) {
        let items = [];   
        for (let i = from; i <= to; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);   
        }
        return items;
    }
    onSubmit(e) {
        const user = {
            id:this.state.id,
            first_name: this.refs.first_name.value,
            last_name: this.refs.last_name.value,
            second_name: this.refs.second_name.value,
            city: this.refs.city.value,
            address: this.refs.address.value,
            phone: this.refs.phone.value,
            birthday: new Date(this.refs.year.value, this.refs.month.value - 1, this.refs.day.value)
        }
        this.editUser(user);
        e.preventDefault();
    }
    render() {
        if(!this.state || !this.state.id) {
            return <div>Loading...</div>
        }
        return (
                <div>
                    <br />
                    <Link className="btn grey" to="/">Back</Link>
                    <h1>Edit User</h1>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="input-field">
                            <input type="text" name="first_name" ref="first_name" onChange={this.handleInputChange.bind(this)} defaultValue={this.state.first_name}/>
                            <label htmlFor="first_name" className="active">First Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="last_name" ref="last_name" defaultValue={this.state.last_name} onChange={this.handleInputChange.bind(this)}/>
                            <label htmlFor="last_name" className="active">Last Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="second_name" ref="second_name" defaultValue={this.state.second_name} onChange={this.handleInputChange.bind(this)}/>
                            <label htmlFor="second_name" className="active">Second Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="city" ref="city" defaultValue={this.state.city} onChange={this.handleInputChange.bind(this)}/>
                            <label htmlFor="city" className="active">City</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="address" ref="address" defaultValue={this.state.address} onChange={this.handleInputChange.bind(this)}/>
                            <label htmlFor="address" className="active">Address</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="phone" ref="phone" defaultValue={this.state.phone} onChange={this.handleInputChange.bind(this)}/>
                            <label htmlFor="phone" className="active">Phone</label>
                        </div>
                        <div className="input-field">
                            <select name="year" ref="year" onChange={this.onDateChange.bind(this)} defaultValue={this.state.birthday.getFullYear()}>
                                {this.createSelectItems(this.state.fromYear, this.state.toYear)}                            
                            </select>
                        </div>
                         <div className="input-field">
                            <select name="month" ref="month" onChange={this.onDateChange.bind(this)} defaultValue={(this.state.birthday.getMonth() + 1)}>
                                {this.createSelectItems(1,12)}                            
                            </select>
                            <label htmlFor="month">Month</label>
                        </div>
                        <div className="input-field">
                            <select name="day" ref="day" defaultValue={this.state.birthday.getDate()}>
                             {this.state.dayItems}                            
                            </select>
                            <label htmlFor="day">Day</label>
                        </div>
                        <input type="submit" value="Save" className="btn" />
                    </form>
                </div>
        )
    }
}
export default EditUser