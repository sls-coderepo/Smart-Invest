import React, {Component} from 'react'
import {Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import API from '../../modules/API.Manager'
import APIIex from '../../modules/API.IEXManager'
import NumberFormat from 'react-number-format'


class StockPurchase extends Component {
    state = {
        stockDetails:{},
        purchaseQty: 0,
        totalPurchase: 0,
        date: ""
      
    }
    
    handleQtyChange = async (evt) => {
        evt.preventDefault()
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        await this.setState(stateToChange)
            this.setState(
                {
                    totalPurchase: (parseFloat(this.state.purchaseQty) * this.props.quote.latestPrice).toFixed(2)
                }
            )
        
    }
    
    handleAmtChange = async (evt) => {
        evt.preventDefault()
        const stateToChange = {}
         stateToChange[evt.target.id] = evt.target.value
         await this.setState(stateToChange)
            this.setState(
                {
                    purchaseQty: (parseFloat(this.state.totalPurchase) / this.props.quote.latestPrice).toFixed(2)
                }
            )
      }
        
    handlePurchase = evt => {
        evt.preventDefault()
        if(this.state.purchaseQty <= 0)
        {
            alert("Enter quantity or amount to purchase")
            return;
        }
         let newInvestment = {
            userId : parseInt(sessionStorage.getItem("loggedInUserId")),
            symbol : this.props.quote.symbol,
            stockName : this.props.quote.companyName,
            purchasePrice : this.props.quote.latestPrice,
            purchaseQty : this.state.purchaseQty,
            totalPrice : this.state.totalPurchase,
            purchaseDate: Date.now(),
            parentId: 0

           
            
            }
            console.log(newInvestment.purchaseDate)
            API.post(newInvestment, "Investments").then((response) => {
                this.props.togglePurchaseModal()
                this.props.history.push('/portfolio')
            })
        }
    

    componentDidMount () {
        
        console.log(this.props.symbol)
        /* APIIex.getQuote(this.props.symbol).then(data => {
            console.log(data);
            this.setState({
                stockDetails: data
            })
        }); */

    }

    render() {
        const closeBtn = <Button className="close" onClick={this.props.togglePurchaseModal}>&times;</Button>
        return(
            <Form>
                <Modal isOpen={this.props.isPurchaseModalOpen} fade={false} toggle={this.props.togglePurchaseModal} className={this.props.className}>
                    <ModalHeader toggle={this.props.togglePurchaseModal}>Purchase</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label htmlFor="purchaseQty">Current Price</Label>
                            <Input type="text" value={this.props.quote.latestPrice} disabled></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="purchaseQty">Purchase Qty</Label>
                            <Input type="number" required onChange={this.handleQtyChange} id="purchaseQty" value={this.state.purchaseQty}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="totalPurchase">Total Amount</Label>
                            <Input type="number" required onChange={this.handleAmtChange} id="totalPurchase"  value={this.state.totalPurchase}></Input>
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