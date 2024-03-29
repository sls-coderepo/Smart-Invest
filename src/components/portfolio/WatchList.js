import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Table, Button} from 'reactstrap'
import API from '../../modules/API.Manager';
import APIIex from '../../modules/API.IEXManager';
import Dialog from 'react-bootstrap-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons'



class WatchList extends Component {
    state = {
        watchList: [],
        watchListWithCurrentValue: [],
        selectedWatchListId: 0,
        loggedInUserId: sessionStorage.getItem('loggedInUserId')
    }

    getLatestQuote = (symbols) =>
    {
        return APIIex.getMarketBatch(symbols).then(data => {
            return data
        })
    }

    getData = () => {
        let stockList=[]
        API.getAll("watchlists", this.state.loggedInUserId).then(data => {
            this.setState({
                watchList : data
            })
        }).then(() => {
            let symbolArray = this.state.watchList.map(a=> a.symbol);
            if(symbolArray.length > 0)
            {
                const symbols= symbolArray.join();
                this.getLatestQuote(symbols).then((data)=>{
                    console.log(data)
                    this.state.watchList.forEach((item) =>
                    {
                        let stock =
                                        {
                                            id:item.id,
                                            symbol:item.symbol,
                                            stockName:item.stockName,
                                            openPrice:data[item.symbol].quote.previousClose,
                                            latestPrice:data[item.symbol].quote.latestPrice,
                                            change:data[item.symbol].quote.change,
                                            changePercent:data[item.symbol].quote.changePercent,
                                          
                                        };
                                        stockList.push(stock)
                    }
                )
                }).then(() => Promise.all(stockList)).then((values) => this.setState({watchListWithCurrentValue:values}))
            }
            else{
                this.setState({watchListWithCurrentValue:[],watchList : []})
            }
        })
    }
    showConfirmBox = (id) => {
        this.setState({
            selectedWatchListId: id
        })
        this.dialog.show({
            title: 'Delete Confirmation',
            body: 'Are you sure you want to delete?',
            actions: [
              Dialog.CancelAction(),
              Dialog.OKAction(() => {this.handleDelete()})
            ],
            bsSize: 'small',
            onHide: (dialog) => {
              dialog.hide()
            }
          })
    }


    handleDelete = () => {
        API.delete(this.state.selectedWatchListId, "watchlists").then(() => this.getData())
        this.dialog.showAlert('Item has been deleted from watchlist.')
    }

    
    componentDidMount(){
         this.getData()
    }

    render(){
        console.log(this.state.watchList)
        return(
            <>
            <h4>Watch List</h4>
            <Table responsive>
               
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th className="text-right">Open Price</th>
                    <th className="text-right">Latest Price</th>
                    <th className="text-right">Change</th>
                    <th className="text-right">Change %</th>
                    <th></th>

                </tr>
                </thead>
                <tbody>
                   {this.state.watchListWithCurrentValue.map(list => {
                       
                       return (<tr  key = {list.id}>
                           <td><Link to={`/portfolio/${list.symbol}`}>{list.symbol}</Link></td>
                           <td>{list.stockName}</td>
                           <td className="text-right">{list.openPrice}</td>
                           <td className="text-right">{list.latestPrice}</td>
                           <td className="text-right" style={{color: list.change > 0 ? "green" : list.change < 0 ? "red" : "black"}}>{list.change}</td>
                           <td className="text-right" style={{color: list.changePercent > 0 ? "green" : list.changePercent < 0 ? "red" : "black"}}>{list.changePercent}%</td>
                           <td className="text-right">
                           <Button type='button' color="secondary" size="sm" color="danger" className="mx-1"
                                    onClick={() => this.showConfirmBox(list.id)}>
						            <FontAwesomeIcon icon={faTrashAlt}/>
				        </Button>
                           </td> 
                       </tr>)
                   })}
                </tbody>
                
            </Table>
            <Dialog ref={(el) => { this.dialog = el }} />
            </>
            
        )
    }
}

export default WatchList