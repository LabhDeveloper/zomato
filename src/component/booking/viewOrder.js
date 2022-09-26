import React, {Component} from 'react';
import axios from 'axios';
import OrderDisplay from './orderDisplay'
import Header from '../../Header';


const oUrl = "https://zomat-api.herokuapp.com/orders"
const url = "https://zomat-api.herokuapp.com/update"


class ViewOrder extends Component{

    constructor(props){
        super(props)

        this.state={
            orders:''
        }
    }

    //api call
    componentDidMount(){
        if(this.props.location){
            let query = this.props.location.search.split('&');
            if(query){
                let data={
                    "status":query[0].split('=')[1],
                    "date":query[2].split('=')[1],
                    "bank_name":query[3].split('=')[1]
                }
                let id = query[1].split('=')[1].split('_')[1];
                fetch(`${url}/${id}`,{
                    method:'PATCH',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                })
            }
        }
        let email = sessionStorage.getItem('userInfo')?sessionStorage.getItem('userInfo').split(',')[1]:''
        axios.get(`${oUrl}?email=${email}`).then((res) => {this.setState({orders:res.data})})
        axios.get(`${oUrl}?email=${email}`).then((res) => {this.setState({orders:res.data})})
        axios.get(`${oUrl}?email=${email}`).then((res) => {this.setState({orders:res.data})})
    }

    render(){
        if(sessionStorage.getItem('loginStatus') === 'LoggedOut' || !('loginStatus' in sessionStorage)){
            return(
                <div>
                    <Header/>
                    <center>
                        <h2>Login First To proceed</h2>
                    </center>
                </div>
            )
        }
        return(
           <>
                <Header/>
                <OrderDisplay orderData={this.state.orders}/>
           </>
        )
    }
    

}

export default ViewOrder;

// import React,{Component} from 'react';
// import axios from 'axios';
// import OrderDisplay from './orderDisplay';
// import Header from '../../Header';

// const oUrl = "https://zomat-api.herokuapp.com/orders"


// class ViewOrder extends Component {

//     constructor(props) {
//         super(props)

//         this.state={
//             orders:''
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
//                 <OrderDisplay orderData={this.state.orders}/>
//             </>
//         )
//     }

//     //api calling
//     componentDidMount(){
//         let email = sessionStorage.getItem('userInfo')?sessionStorage.getItem('userInfo').split(',')[1]:''
//         axios.get(`${oUrl}?email=${email}`).then((res) => {this.setState({orders:res.data})})
//     }
// }

// export default ViewOrder;