import React, {Component} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import M from "materialize-css";
import MaskedInput from 'react-maskedinput'
class AddUser extends Component {
    constructor(){
        super()
        this.state = {
            fromYear:new Date().getFullYear() - 70,
            toYear:new Date().getFullYear(),
            dayItems:[],
            user: {
                first_name:'',
                last_name:'',
                second_name:'',
                address:'',
                city:'',
                birthday: new Date(),
                phone:''
            }
        }
    }
    componentDidMount () {
        const user = {};
        Object.keys(this.state.user).forEach((key) => {
                user[key] = localStorage.getItem(key) || this.state.user[key];
        })


        this.setState({user}, () => {
            console.log(this.state)
            this.setDayItems();
            let selects = document.querySelectorAll('select:not([name="day"])');
            M.FormSelect.init(selects, {});
        })
    }
    clearSavedValues() {
        Object.keys(this.state.user).forEach((key) => {
            localStorage.removeItem(key)
       })
    }
    addUser(newUser) {
        axios.request({
            method:"post",
            url: "http://localhost:3000/users", 
            data:newUser,
        }).then(response => {
            this.clearSavedValues();
            this.props.history.push('/')
        })
        .catch(err => console.log(err));
    }
    createSelectItems(from, to) {
        let items = [];   
        for (let i = from; i <= to; i++) {             
             items.push(<option key={i} value={i}>{i}</option>);   
        }
        return items;
    }
    onSubmit(e) {
        this.addUser(this.state.user);
        e.preventDefault();
    }
    setDayItems() {
        const lastDay = new Date(this.state.user.year || this.state.fromYear, this.state.user.month || 0, 0).getDate();
        if(this.state.dayItems.length && this.state.dayItems.length === lastDay) {
            return;
        }
        const elements = this.createSelectItems(1, lastDay);

        this.setState({dayItems:elements}, () => {
            let select = document.querySelector(`select[name='day']`);
            M.FormSelect.init(select, {});
        });       
    }
    onDateChange(e) {
        console.log(this.state)

        const user = {...this.state.user}
        user[e.target.name] = e.target.value;
        this.setState({user}, () => {
            this.setDayItems();
        })
        localStorage.setItem(e.target.name, e.target.value)
        
    }
    _onChange(e) {
        const user = {...this.state.user}
        user[e.target.name] = e.target.value;
        this.setState({user}, () => {
            console.log(this.state)
        })
        localStorage.setItem(e.target.name, e.target.value)
    }
    
    render() {
        return (
                <div>
                    <br />
                    <Link className="btn grey" to="/">Back</Link>
                    <h1>Add User</h1>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="input-field">
                            <input type="text" name="first_name" value={this.state.user.first_name} onChange={this._onChange.bind(this)} />
                            <label htmlFor="first_name">First Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="last_name" value={this.state.user.last_name} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="last_name">Last Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="second_name" value={this.state.user.second_name} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="second_name">Second Name</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="city" value={this.state.user.city} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="address" value={this.state.user.address} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="input-field">
                            <MaskedInput mask="+7(111) 111-11-11" name="phone" value={this.state.user.phone} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="phone" className="active">Phone</label>
                        </div>
                        <div className="input-field">
                            <select name="year" onChange={this.onDateChange.bind(this)} value={this.state.user.birthday.getFullYear()}>
                                {this.createSelectItems(this.state.fromYear, this.state.toYear)}                            
                            </select>
                            <label htmlFor="year">Year</label>
                        </div>
                         <div className="input-field">
                            <select name="month" onChange={this.onDateChange.bind(this)} value={ this.state.user.birthday.getMonth()}>
                                {this.createSelectItems(1,12)}                            
                            </select>
                            <label htmlFor="month">Month</label>
                        </div>
                        <div className="input-field">
                            <select name="day" onChange={this._onChange.bind(this)} value={this.state.user.birthday.getDay()}>
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
export default AddUser