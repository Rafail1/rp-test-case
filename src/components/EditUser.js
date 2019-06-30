import React, {Component} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import M from "materialize-css";

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fromYear:new Date().getFullYear() - 70,
            toYear:new Date().getFullYear(),
            monthes: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь', 'Декабрь'],
            user: {
                fio:'',
                address:'',
                city:'',
                birthday: new Date(this.fromYear, 0, 1),
                phone:''
            }
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
            url: `http://localhost:3000/users/${this.state.user.id}`, 
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
            this.setState({user:response.data}, () => {
                this.initSelects();
                this.setDayItems();
            })
        }, () => {
            console.log(this.state)
        })
        .catch(err => console.log(err))
    }
    _onChange(e) {
        const user = {...this.state.user}
        user[e.target.name] = e.target.value;
        this.setState({user})
    }
    setDayItems() {
        const lastDay = new Date(this.state.user.birthday.getFullYear(), this.state.user.birthday.getMonth(), 0).getDate();
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
        const user = {...this.state.user}
        const dateFields = {year:user.birthday.getFullYear(), month: user.birthday.getMonth(), day:user.birthday.getDate()}
        dateFields[e.target.name] = e.target.value;
        user.birthday = new Date(dateFields.year, dateFields.month, dateFields.day);
        console.log(user.birthday);
        this.setState({user}, () => {
            this.setDayItems();
        })
    }
    createSelectItems(from, to, arrValues) {
        let items = [];   
        for (let i = from; i <= to; i++) {             
             items.push(<option key={i} value={i}>{arrValues ? arrValues[i] :  i}</option>);   
        }
        return items;
    }
    onSubmit(e) {
        this.editUser(this.state.user);
        e.preventDefault();
    }
    render() {
        if(!this.state || !this.state.user.id) {
            return <div>Загрузка...</div>
        }
        return (
                <div>
                    <br />
                    <Link className="btn grey" to="/">Назад</Link>
                    <h1>Изменить</h1>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <div className="input-field">
                            <input name="fio" id="fio" required maxLength="100" className="validate" onChange={this._onChange.bind(this)} value={this.state.user.fio}/>
                            <label htmlFor="fio" className="active">ФИО</label>
                            <span className="helper-text" data-error="Обязательное поле"></span>

                        </div>
                        <div className="input-field">
                            <input name="city" id="city" value={this.state.user.city} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="city" className="active">Город</label>
                        </div>
                        <div className="input-field">
                            <input name="address" id="address" value={this.state.user.address} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="address" className="active">Адрес</label>
                        </div>
                        <div className="input-field">
                            <input name="phone" id="phone" value={this.state.user.phone} onChange={this._onChange.bind(this)}/>
                            <label htmlFor="phone" className="active">Телефон</label>
                        </div>
                        <div className="input-field">
                            <select name="year" id="year" onChange={this.onDateChange.bind(this)} value={this.state.user.birthday.getFullYear()}>
                                {this.createSelectItems(this.state.fromYear, this.state.toYear)}                            
                            </select>
                            <label htmlFor="year">Год</label>

                        </div>
                         <div className="input-field">
                            <select name="month" id="month" onChange={this.onDateChange.bind(this)} value={this.state.user.birthday.getMonth()}>
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
export default EditUser