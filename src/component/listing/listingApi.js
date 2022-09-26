import React,{Component} from 'react';
import axios from 'axios';
import './listing.css';
import CuisineFilter from '../filters/cuisineFilter';
import CostFilter from '../filters/costFilter';
import ListingDisplay from './listingDisplay';
import Header from '../../Header';


const url = "https://zomat-api.herokuapp.com/restaurants?mealId=";

class Listing extends Component {
    constructor(props) {
        super(props)
        this.state={
            restaurantList:''
        }
    }

    setDataPerFilter = (data) => {
        this.setState({restaurantList:data})
    }

    render(){
        return(
            <>
                <Header/>
                <div className="row">
                    <div id="mainListing">
                        <div id="filter">
                            <center>
                                <h3 style={{color:"white",fontSize:"30px"}}>Filter Here</h3>
                                <hr style={{borderColor:"gray"}}/>
                                
                            </center>
                            <CuisineFilter mealId={this.props.match.params.mealId}
                            restPerCuisine={(data) => {this.setDataPerFilter(data)}}/>
                            <hr/>
                            <CostFilter mealId={this.props.match.params.mealId}
                            restPerCost={(data) => {this.setDataPerFilter(data)}}/>
                        </div>
                        <ListingDisplay listData={this.state.restaurantList}/>
                    </div>
                </div>
            </>
        )
    }

    //api calling with axios
    componentDidMount() {
        let mealId = this.props.match.params.mealId;
        sessionStorage.setItem('mealId',mealId)
        axios.get(`${url}${mealId}`)
        .then((res) => {this.setState({restaurantList:res.data})})
    }
}



export default Listing