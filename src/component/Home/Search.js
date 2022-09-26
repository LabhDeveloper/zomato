import React,{Component} from 'react';
import './Search.css';
import {withRouter} from 'react-router-dom'


const lurl = 'https://zomat-api.herokuapp.com/location';
const restUrl = 'https://zomat-api.herokuapp.com/restaurants?stateId='

class Search extends Component {
    
    constructor(props){
        super(props)
        console.log(">>>>>>>inside constructor")
        this.state={
            location:'',
            restaurant:''
        }
    }

    renderCity = (data) => {
        if (data){
            return data.map((item) => {
                return(
                    <option value={item.state_id} key={item.state_id}>{item.state}</option>
                )
            })
        }
    }

    handleCity = (event) => {
        let stateId = event.target.value;
        fetch(`${restUrl}${stateId}`,{method: 'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({restaurant:data})
        })
    }

    renderRest = (data) => {
        if (data){
            return data.map((item) => {
                return(
                    <option value={item.restaurant_id} key={item.restaurant_id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                )
            })
        }
    }

    handleRest = (event) => {
        this.props.history.push(`/details?restId=${event.target.value}`)
    }

    render(){
        console.log(">>>>>>>inside render",this.props)
        return(
            <div className="showcase">
                <hr/>
                <div className="showcase-content">
                    
                    <h1>ZOMATO</h1>
                    <h3>Find The Best Restaurants Near You</h3>
                    
                    <div className="dropdown">
                        <select onChange={this.handleCity}>
                            <option>----SELECT YOUR CITY----</option>
                            {this.renderCity(this.state.location)}
                        </select>
                        <select className="restSelect" onChange={this.handleRest}>
                            <option>----SELECT YOUR RESTAURANTS----</option>
                            {this.renderRest(this.state.restaurant)}
                        </select>
                    </div>
                </div>
            </div>
            // <div id="search">
            //     <div id="container">
            //         <div id="heading">
            //             Find The Best Restaurants Near You
            //         </div>
            //         <div className="dropdown">
            //             <select onChange={this.handleCity}>
            //                 <option>----SELECT YOUR CITY----</option>
            //                 {this.renderCity(this.state.location)}
            //             </select>
            //             <select className="restSelect" onChange={this.hanldeRest}>
            //                 <option>----SELECT YOUR RESTAURANTS----</option>
            //                 {this.renderRest(this.state.restaurant)}
            //             </select>
            //         </div>
            //     </div>
            // </div> 
    )
    }

    //api calling on page load

    componentDidMount(){
        fetch(lurl,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {
            this.setState({location:data})
        })
    }
}

export default withRouter(Search);


