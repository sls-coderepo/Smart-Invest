import React, {Component} from 'react'
import {Alert, Input, InputGroup, InputGroupAddon, Button} from 'reactstrap'
import StockSearchResult from './StockSearchResult';
import APIIex from '../../modules/API.IEXManager';
import AlternateStock from './AlternateStock';
import APIStockManager from '../../modules/API.StockManager'
import API from '../../modules/API.Manager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class Alternate extends Component {
    state = {
       investmentId : this.props.investmentId,
       keyword: "",
       searchResult: [],
       investment:{},
       loggedInUserId: sessionStorage.getItem('loggedInUserId')
      }

    handleFieldChange = e => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value;
        this.setState(stateToChange)
    }
     
    searchStock = e => {
        e.preventDefault();
        this.getStockList();
    }

    getStockList = () =>
    {
        APIStockManager.getStocks(this.state.keyword).then((data) => {
            console.log(data)
            this.setState({
                searchResult : data
            })
            })
    } 

    handleAddAlternate = (symbol) =>
    {
        APIIex.getQuote(symbol).then((data) => {
           console.log(data)
            let alternateStock = {
                symbol: data.symbol,
                stockName: data.companyName,
                purchasePrice: data.latestPrice,
                purchaseQty: (this.state.investment.totalPrice/data.latestPrice).toFixed(5),
                totalPrice: this.state.investment.totalPrice,
                parentId: this.state.investment.id,
                purchaseDate: Date.now(),
                userId: this.state.loggedInUserId
            }
            API.post(alternateStock, "Investments").then((response) => {
                    this.props.history.push(`/portfolio/${this.state.investment.symbol}`)
            })
            
        })
    }
   
    hasSymbols = ()=>
    {
        if(this.state.searchResult.length > 0)
        {
            return true;
        }
        return false;
    }

    componentDidMount () {
        API.get(this.props.investmentId, this.state.loggedInUserId, "investments").then(response => {this.setState({
            investment : response
     })})
    }
        
    render(){
        console.log(this.state.searchResult)
        return (
        <>
        <Alert color="secondary">
            <InputGroup>
            <Input type="text" className="searchBox" id="keyword" 
                                                     onChange={this.handleFieldChange} 
                                                     onKeyPress={(event) => {
                                                         if(event.key === "Enter") {
                                                             this.searchStock(event)
                                                         }
                                                     }}
                                                     /* value={this.state.keyword} */></Input>
            <InputGroupAddon addonType="append"><Button onClick={this.searchStock}><FontAwesomeIcon icon={faSearch}/></Button></InputGroupAddon>
        </InputGroup>
        </Alert>
        
        {this.hasSymbols() ? 
            <StockSearchResult searchResult = {this.state.searchResult} handleAddAlternate={this.handleAddAlternate} {...this.props} />
            :<AlternateStock investmentId={this.state.investmentId}  investment={this.state.investment}  {...this.props}/>
        }

        <Button onClick={()=> this.props.history.push(`/portfolio/${this.state.investment.symbol}`)}>Back to {this.state.investment.symbol}</Button>
        </>
        
        )
    }
} 

export default Alternate