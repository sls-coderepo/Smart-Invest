import React, {Component} from 'react'
import {Table} from 'reactstrap'
import API from '../../modules/API.Manager';
import APIIex from '../../modules/API.IEXManager';
import APIStock from '../../modules/API.AlphaVintageManager'

class WatchList extends Component {
    state = {
        watchList: [],
        stockWatch: {
            symbol:'',
            companyName:'',
            latestPrice:""
        }
    }

     getCurrentPrice = (stock) =>
    {
          var stockWatch = {
                symbol: stock.symbol,
                companyName: stock.stockName,
                latestPrice: ""
            };
            console.log(stock)
             return APIStock.getGlobalQuote(stock.symbol).then((response) => {console.log(response)
             stockWatch.latestPrice =  response["05. price"]
             return stockWatch
            })
           //return stockWatch
            
    }

    getData = () => {
        var stocklist=[]
        API.getAll("watchlists").then(data => {
            data.forEach((stock) => 
                     {
                         console.log(stock)
                         //console.log(this.getCurrentPrice(stock))
                        stocklist.push(this.getCurrentPrice(stock))
                        //stocklist.push(this.state.stockWatch)
                    }
            )
            //console.table(stocklist)
            //this.setState({watchList:stocklist})
            //console.table(this.state.watchList)
        }).then(() => Promise.all(stocklist).then((values) =>  this.setState({watchList:values})))
    }

    
 
    componentDidMount(){
         this.getData()
    }
    render(){
        console.log(this.state.watchList)
        return(
            <>
            <h4>Watch List</h4>
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
                       
                       return (<tr  key = {list.id}>
                           <td>{list.symbol}</td>
                           <td>{list.companyName}</td>
                           <td>{list.latestPrice}</td>
                           <td>
                               <button>Edit</button>
                               <button>Delete</button>
                           </td> 
                       </tr>)
                   })}
                </tbody>
                
            </Table>
            </>
            
        )
    }
}

export default WatchList