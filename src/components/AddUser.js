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
            monthes: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь', 'Декабрь'],
            user: {
                fio:'',
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
            let val = localStorage.getItem(key);
            if(key === 'birthday') {
                user[key] = new Date(val);
            } else {
                user[key] = val || this.state.user[key];
            }
        })
        this.setState({user}, () => {
            this.setDayItems();
            let selects = document.querySelectorAll('select:not([name="day"])');
            M.FormSelect.init(selects, {});
            M.updateTextFields();
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
    createSelectItems(from, to, arrValues) {
        let items = [];   
        for (let i = from; i <= to; i++) {             
             items.push(<option key={i} value={i}>{arrValues ? arrValues[i] :  i}</option>);   
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
        const user = {...this.state.user}
        const dateFields = {year:user.birthday.getFullYear(), month: user.birthday.getMonth(), day:user.birthday.getDate()}
        dateFields[e.target.name] = e.target.value;
        user.birthday = new Date(dateFields.year, dateFields.month, dateFields.day);
        this.setState({user}, () => {
                this.setDayItems();
        })
        localStorage.setItem('birthday', user.birthday)
        
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
                    <Link className="btn grey" to="/">Назад</Link>
                    <h1>Add User</h1>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="input-field">
                            <input type="text" name="fio" id="fio" required maxLength="100" className="validate" value={this.state.user.fio} onChange={this._onChange.bind(this)} />
                            <label htmlFor="fio">ФИО</label>
                            <span className="helper-text" data-error="Обязательное поле"></span>
                        </div>
                        <div className="input-field">
                            <input type="text" name="city" id="city" value={this.state.user.city} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="city">Город</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="address" id="address" value={this.state.user.address} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="address">Адрес</label>
                        </div>
                        <div className="input-field">
                            <MaskedInput mask="+7(111) 111-11-11" id="phone" name="phone" value={this.state.user.phone} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="phone" className="active">Телефон</label>
                        </div>
                        <div className="input-field">
                            <select name="year" id="year" onChange={this.onDateChange.bind(this)} value={this.state.user.birthday.getFullYear()}>
                                {this.createSelectItems(this.state.fromYear, this.state.toYear)}                            
                            </select>
                            <label htmlFor="year">Год</label>
                        </div>
                         <div className="input-field">
                            <select name="month" id="month" onChange={this.onDateChange.bind(this)} value={ this.state.user.birthday.getMonth()}>
                             {this.createSelectItems(0,11, this.state.monthes)}                            
                            </select>
                            <label htmlFor="month">Месяц</label>
                        </div>
                        <div className="input-field">
                            <select name="day" id="day" onChange={this.onDateChange.bind(this)} value={this.state.user.birthday.getDate()}>
                             {this.state.dayItems}
                            </select>
                            <label htmlFor="day">День</label>
                        </div>
                        <input type="submit" value="Сохранить" className="btn" />
                    </form>
                </div>
        )
    }
}
export default AddUser