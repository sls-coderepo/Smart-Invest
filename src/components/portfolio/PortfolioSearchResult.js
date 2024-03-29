import React, {Component} from 'react'
import {Table} from 'reactstrap'
import PortfolioSearchResultRecord from './PortfolioSearchResultRecord';

class PortfolioSearchResult extends Component {
    
    render(){
        return (
            <Table striped>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {this.props.searchResult.map(stock => (
                    <PortfolioSearchResultRecord key={stock.symbol} 
                                                 stock = {stock} 
                                                 {...this.props} />
                ))}
                </tbody>
            </Table>
        )
    }
} 

export default PortfolioSearchResult