import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import M from "materialize-css";


class Navbar extends Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() {
        return (
            <div>
<nav className="nav-extended">
    <div className="nav-wrapper">
      <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="fa fa-bars"></i></a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/"><i className="fa fa-users"></i> Users</Link></li>
        <li><Link to="/users/add"><i className="fa fa-plus"></i> Add User</Link></li>
      </ul>
    </div>
   
  </nav>

  <ul className="sidenav" id="mobile-demo">
    <li><Link to="/"><i className="fa fa-users"></i> Users</Link></li>
    <li><Link to="/users/add"><i className="fa fa-users"></i> Add User</Link></li>
  </ul>
            </div>
        )
    }
}

export default Navbar