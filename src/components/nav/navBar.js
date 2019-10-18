import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

class NavBar extends Component {
  render() {
    return (
        <header>
        <h1 className="site-title">SMART INVEST<br />
        </h1>
        <nav>
          <ul className="container">
               <li>
                   <Link className="nav-link">Logout</Link>
                </li>
               <li>
                   <Link className="nav-link"  to="/login">Login</Link>
                </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;
