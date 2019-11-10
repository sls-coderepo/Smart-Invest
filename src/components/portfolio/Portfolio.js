import React, {Component} from 'react'
import {Alert,Input,InputGroup, InputGroupAddon, Button} from 'reactstrap'
import APIStockManager from '../../modules/API.StockManager'
import PortfolioSearchResult from './PortfolioSearchResult';
import InvestmentResult from './InvestmentResult';
import WatchList from '../portfolio/WatchList'
import Dialog from 'react-bootstrap-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class Portfolio extends Component {
    state = {
       keyword: "",
       searchResult: [],
      }
     
      handleFieldChange = e => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value;
        this.setState(stateToChange)
    }

       
    searchStock = () =>
    {
        APIStockManager.getStocks(this.state.keyword).then((data) => {
            this.setState({
                searchResult : data
            })
            }).then(()=>
            {
                if(!this.hasSymbols())
                {
                    this.dialog.showAlert('No stocks found matching the search keyword.')
                }
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
      
    render(){
        return (
        <>
        <Alert color="secondary">
            <InputGroup>
            <Input type="text" className="searchBox" id="keyword"  onChange={this.handleFieldChange} 
                                                                    onKeyPress={(event) => {
                                                                        if (event.key === "Enter") {
                                                                            this.searchStock(event)
                                                                            }
                                                                        }}></Input>
            <InputGroupAddon addonType="append"><Button onClick={this.searchStock}><FontAwesomeIcon icon={faSearch}/></Button></InputGroupAddon>
        </InputGroup>
        </Alert>
        
        {this.hasSymbols() ? 
            <PortfolioSearchResult searchResult = {this.state.searchResult} {...this.props} />
            :<><InvestmentResult 
            {...this.props}/>
            <WatchList /></>
        }
        <Dialog ref={(el) => { this.dialog = el }} />
        </>
        
        )
    }
} 

export default Portfolio