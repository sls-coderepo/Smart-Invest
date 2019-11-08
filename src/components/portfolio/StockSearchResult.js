import React, {Component} from 'react'
import {Table, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

class StockSearchResult extends Component {
    
    render(){
        return (
            <Table striped size="sm">
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {this.props.searchResult.map(stock => (
                    <tr>
                        <td>{stock.symbol}</td>
                        <td>{stock.name}</td>
                        <td className="text-right"><Button size="sm" color="info" onClick={() =>{this.props.handleAddAlternate(stock.symbol)}}><FontAwesomeIcon icon={faPlus}/>{" "}Add </Button></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        )
    }
} 

export default StockSearchResult