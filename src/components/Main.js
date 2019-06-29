import React from 'react'
import {Switch, Route} from 'react-router-dom'
import ListUsers from './ListUsers'
import AddUser from './AddUser'
import EditUser from './EditUser'
import UserDetail from './UserDetail'

const Main = () => (
<main>
    <Switch>
        <Route exact path='/' component={ListUsers} />
        <Route exact path='/users/add' component={AddUser} />
        <Route exact path='/users/edit/:id' component={EditUser} />
        <Route exact path='/users/:id' component={UserDetail} />
    </Switch>
</main>
)

export default Main