import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import API from '../../modules/API.Manager'
import APIIex from '../../modules/API.IEXManager'


class StockPurchase extends Component {
    state = {
        stockDetails:{},
        purchaseQty: "",
        totalPurchase: "",
        date: ""
      
    }
    
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    
    handleChange = (e) => {
        let pruchaseTotal = this.state.purchaseQty * this.state.stockDetails.latestPrice
        this.setState(pruchaseTotal);
      }
        
    handlePurchase = evt => {
        evt.preventDefault()
         let newInvestment = {
            userId : parseInt(localStorage.getItem("loggedInUserId")),
            symbol : this.state.stockDetails.symbol,
            stockName : this.state.stockDetails.companyName,
            purchasePrice : this.state.stockDetails.latestPrice,
            purchaseQty : this.state.purchaseQty,
            totalPrice : this.state.purchaseQty * this.state.stockDetails.latestPrice,
            purchaseDate: Date.now()
           
            
            }
            console.log(newInvestment.purchaseDate)
            API.post(newInvestment, "Investments").then((response) => {
                this.props.togglePurchaseModal()
                //this.props.setUser(response.id);
                this.props.history.push('/')
            })
        }
    

    componentDidMount () {
        
        console.log(this.props.symbol)
        APIIex.get(this.props.symbol).then(data => {
            console.log(data);
            this.setState({
                stockDetails: data
            })
        });

    }

    render() {
        const closeBtn = <Button className="close" onClick={this.props.togglePurchaseModal}>&times;</Button>
        return(
            <Form>
                <Modal isOpen={this.props.isPurchaseModalOpen} fade={false} toggle={this.props.togglePurchaseModal} className={this.props.className}>
                    <ModalHeader toggle={this.props.togglePurchaseModal}>Purchase</ModalHeader>
                    <ModalBody>
                    <FormGroup>
                    <Label htmlFor="purchaseQty">Purchase Qty</Label>
                    <Input type="text" required onChange={this.handleFieldChange} id="purchaseQty"></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="totalAmount">Total Amount</Label>
                    <Input type="text" required value={this.state.totalPurchase} onChange={this.handleChange} id="totalAmount"></Input>
                </FormGroup>
                
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={this.handlePurchase}>
                         Buy
                </Button>
                    </ModalFooter>
                </Modal>
              
            </Form> 
        )
    }
}

export default StockPurchase