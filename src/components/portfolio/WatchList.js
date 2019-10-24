import React, {Component} from 'react'
import {Table} from 'reactstrap'
import API from '../../modules/API.Manager';

class WatchList extends Component {
    state = {
        watchList: []
    }

    getData = () => {
        API.getAll("watchlists").then(data => {
            console.table(data)
            this.setState({
            watchList: data
            })
        })
        
    }

    componentDidMount(){
        
        this.getData()
    }

    render(){
        return(
            <>
            <Table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                   {this.state.watchList.map(list => {
                       return (<tr>
                           <td>{list.symbol}</td>
                           <td>{list.stockName}</td>
                           <td></td>
                       </tr>)
                   })}
                </tbody>
            </Table>
            </>
            
        )
    }
}

export default WatchList