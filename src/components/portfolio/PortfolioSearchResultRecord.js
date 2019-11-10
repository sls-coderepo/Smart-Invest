import React, {Component} from 'react'
import {Link} from "react-router-dom";

class PortfolioSearchResultRecord extends Component {
    
    render(){
        return (
            
                <tr>
                    <td><Link to={`/portfolio/${this.props.stock.symbol}`}>{this.props.stock.symbol}</Link></td>
                    <td>{this.props.stock.name}</td>
                    <td ></td>
                </tr>
            
               
        )
    }
} 

export default PortfolioSearchResultRecord