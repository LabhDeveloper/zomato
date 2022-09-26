import React, {Component} from 'react';
import './placeOrder.css';
import Header from '../../Header';

const url = "https://zomat-api.herokuapp.com/menuItem";
const oUrl = "https://zomat-api.herokuapp.com/placeOrder";

class PlaceOrder extends Component{

    constructor(props){
        super(props)
        let sessionData = sessionStorage.getItem('userInfo')?sessionStorage.getItem('userInfo').split(','):[]

        this.state={
            order_id:Math.floor(Math.random()*10000),
            brand_name:this.props.match.params.restName,
            name:sessionData?sessionData[0]:'',
            email:sessionData?sessionData[1]:'',
            cost:0,
            phone:sessionData?sessionData[2]:'',
            address:'',
            menuItem:''
        }
    }

    handleChange=(event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    checkout = () => {
        let obj = this.state;
        obj.menuItem = sessionStorage.getItem('menu');
        fetch(oUrl,{
            method: 'POST',
            headers: {
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        //.then(this.props.history.push('/viewBooking'))
        .then(console.log('order added'))
    }

    renderItem = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <div className="orderItems" key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name}/>
                        <h3>{item.menu_name}</h3>
                        <h4>&#8377; {item.menu_price}</h4>
                    </div>
                )
            })
        }
    }

    render(){
        if(sessionStorage.getItem('loginStatus') === 'LoggedOut' || !('loginStatus' in sessionStorage)){
            return(
                <div>
                    <Header/>
                    <center>
                        <h2>Login First To Place Order</h2>
                    </center>
                </div>
            )
        }
        
        return(
            <>
                <Header/>
                <div className="container">
                    <hr/>
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Your Order
                        </div>
                        <div className="panel-body">
                            <form action="https://pay-lens.herokuapp.com/paynow" id="yat" method="POST">
                                <div className="row">
                                    <input type="hidden" name="cost" value={this.state.cost}/>
                                    <input type="hidden" name="order_id" value={this.state.order_id}/>
                                    <input type="hidden" name="brand_name" value={this.state.brand_name}/>
                                    <div className="form-group col-md-6">
                                        <label for="fname" className="control-label">Name</label>
                                        <input className="form-control" id="fname" name="name" value={this.state.name}
                                        onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="email" className="control-label">Email</label>
                                        <input className="form-control" name="email" value={this.state.email}
                                        onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="phone" className="control-label">Phone</label>
                                        <input className="form-control" name="phone" value={this.state.phone}
                                        onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="address" className="control-label">Address</label>
                                        <input className="form-control" name="address" value={this.state.address} placeholder="address"
                                        onChange={this.handleChange}/>
                                    </div>
                                </div>
                                {this.renderItem(this.state.menuItem)}
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Order Total : &#8377;{this.state.cost}</h2>
                                    </div>
                                    
                                </div>
                                <button className="btn btn-success" type="submit"
                                onClick={this.checkout}>Confirm</button> 
                            </form>
                        </div>
                    </div>
                </div>
            </>
            
        )
    }

    //call api 
    componentDidMount(){
        let menuItem = sessionStorage.getItem('menu');
        let orderId = [];
        menuItem.split(',').map((item) => {
            orderId.push(parseInt(item));
            return 'ok'
        })
        fetch(url,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(orderId)
        })
        .then((res) => res.json())
        .then((data) => {
            let totalPrice =0;
            data.map((item) => {
                totalPrice = totalPrice + parseFloat(item.menu_price);
                return 'ok'
            })
            this.setState({menuItem:data,cost:totalPrice})
        })
    }
}

export default PlaceOrder;

// import React,{Component} from 'react';
// import './placeOrder.css';
// import Header from '../../Header';

// const url = "https://zomat-api.herokuapp.com/menuItem";
// const oUrl = "https://zomat-api.herokuapp.com/placeOrder";


// class PlaceOrder extends Component {
   
//     constructor(props){
//         super(props)

//         let sessionData = sessionStorage.getItem('userInfo')?sessionStorage.getItem('userInfo').split(','):[]
 
//         this.state={
//             id:Math.floor(Math.random()*10000),
//             hotel_name:this.props.match.params.restName,
//             name:sessionData?sessionData[0]:'',
//             email:sessionData?sessionData[1]:'',
//             cost:0,
//             phone:sessionData?sessionData[2]:'',
//             address:'',
//             menuItem:''

//         }
//     }

//     handleChange=(event)=>{
//         this.setState({[event.target.name]:event.target.value})

//     }

//     checkout = () => {
//         let obj = this.state;
//         obj.menuItem = sessionStorage.getItem('menu');
//         fetch(oUrl,{
//             method: 'POST',
//             headers: {
//                 'accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify(obj)
//         })
//         // .then(this.props.history.push('/viewBooking'))
//         .then(console.log('Order Added'))
//     }

//     renderItem = (data) => {
//         if(data){
//             return data.map((item) => {
//                 return(
//                     <div className="orderItems" key={item.menu_id}>
//                         <img src={item.menu_image} alt={item.menu_name}/>
//                         <h3>{item.menu_name}</h3>
//                         <h4> &#8377; {item.menu_price}</h4>
//                     </div>
//                 )
//             })
//         }
//     }

//     render(){

//         if(sessionStorage.getItem('loginStatus') === 'LoggedOut' || !('loginStatus' in sessionStorage)){
//             return(
//                 <div>
//                     <Header/>
//                     <center>
//                         <h2>Login First to Proceed</h2>
//                     </center>
//                 </div>
//             )
//         }

//         return(
//             <>  
//                 <Header/>
//                 <div className="container">
//                 <hr/>
//                     <div className="panel panel-primary">
                        
//                         <div className="panel-heading">
//                             Your Order
//                         </div>
//                         <div className="panel-body">
//                             <form action="https://developerpayment.herokuapp.com/paynow" method="POST">
//                                 <div className="row">
//                                     <input type="hidden" name="cost" value={this.state.cost}/>
//                                     <input type="hidden" name="id" value={this.state.id}/>
//                                     <input type="hidden" name="hotel_name" value={this.state.hotel_name}/>
//                                     <div className="form-group col-md-6">
//                                         <label htmlFor="fname" className="control-label">FirstName</label>
//                                         <input className="form-control" id="fname" name="fname" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>
//                                     </div>
//                                     <div className="form-group col-md-6">
//                                         <label htmlFor="email" className="control-label">Email</label>
//                                         <input className="form-control" name="email" placeholder="email" value={this.state.email} 
//                                         onChange={this.handleChange}/>
//                                     </div>
//                                     <div className="form-group col-md-6">
//                                         <label htmlFor="phone" className="control-label">Phone</label>
//                                         <input className="form-control" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange}/>
//                                     </div>
//                                     <div className="form-group col-md-6">
//                                         <label htmlFor="address" className="control-label">Address</label>
//                                         <input className="form-control" name="address" placeholder="address" value={this.state.address} 
//                                         onChange={this.handleChange}/>
//                                     </div>
//                                 </div>
//                                 {this.renderItem(this.state.menuItem)}
//                                 <div className="row">
//                                     <div className="col-md-12">
//                                         <h2>Total Price : &#8377;{this.state.cost}</h2>
//                                     </div>
//                                 </div>
//                                 <button className="btn btn-success" type="submit" onClick={this.checkout}>PlaceOrder</button>
                                
//                             </form>   
//                         </div>
//                     </div> 
//                 </div>
//             </>
//         )
//     }

//     //calling api
//     componentDidMount(){
//         let menuItem = sessionStorage.getItem('menu');
//         let orderId = [];
//         menuItem.split(',').map((item) => {
//             orderId.push(parseInt(item));
//             return 'ok'
//         })
//         fetch(url,{
//             method: 'POST',
//             headers:{
//                 'accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body:JSON.stringify(orderId)
//         })
//         .then((res) => res.json())
//         .then((data) => {
//             let totalPrice = 0;
//             data.map((item) => {
//                 totalPrice = totalPrice + parseFloat(item.menu_price);
//                 return 'ok'
//             })
//             this.setState({menuItem:data,cost:totalPrice})
//         })
//     }
// }

// export default PlaceOrder;