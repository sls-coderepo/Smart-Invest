import React, {Component} from 'react'
import {Link} from "react-router-dom";

class PortfolioSearchResultRecord extends Component {
    
    render(){
        return (

                <tr>
                    <td><Link to={`/portfolio/${this.props.stock["1. symbol"]}`}>{this.props.stock["1. symbol"]}</Link></td>
                    <td>{this.props.stock["2. name"]}</td>
                    <td>{this.props.stock["3. type"]}</td>
                    <td></td>
                </tr>
        )
    }
} 

export default PortfolioSearchResultRecord