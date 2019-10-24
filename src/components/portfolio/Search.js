import React, {Component} from 'react'
import {Alert,Input,InputGroup, InputGroupAddon, Button} from 'reactstrap'
import APIStock from '../../modules/API.AlphaVintageManager';
import PortfolioSearchResult from './PortfolioSearchResult';

class PortfolioSearch extends Component {
    state = {
       keyword: "",
       searchResult: [],
      }

      handleFieldChange = e => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value;
        this.setState(stateToChange)
    }
     
    searchStock = e => {
        e.preventDefault();
         APIStock.search(this.state.keyword).then((data) => {
                        this.setState({searchResult: data})
                        })
    }

    hasSymbols = ()=>
    {
        if(this.state.searchResult.length >0)
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
            <Input type="text" className="searchBox" id="keyword" onChange={this.handleFieldChange}></Input>
            <InputGroupAddon addonType="append"><Button onClick={this.searchStock}>Search</Button></InputGroupAddon>
        </InputGroup>
        </Alert>
        
        {this.hasSymbols() ? 
            <PortfolioSearchResult searchResult = {this.state.searchResult} {...this.props} />
            :null
        }
        </>
        
        )
    }
} 

export default PortfolioSearch