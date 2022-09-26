import React,{Component} from 'react';
import axios from 'axios';
import './filter.css'

const url = "https://zomat-api.herokuapp.com/filter";

class CuisineFilter extends Component{

    filterCuisine = (event) => {
        let mealId = this.props.mealId;
        let cuisineId = event.target.value;
        let cuisineUrl;
        if(cuisineId === ""){
            cuisineUrl = `${url}/${mealId}`
        }else{
            cuisineUrl = `${url}/${mealId}?cuisineId=${cuisineId}`
        }
        axios.get(cuisineUrl)
        .then((res) => {this.props.restPerCuisine(res.data)})
    }

    render(){
        return(
            <>
                <center className="si">
                    CuisineFilter
                </center>
                <div className="toy"style={{marginLeft:"15%"}} onChange={this.filterCuisine}>
                    <label className="radio">
                        <input type="radio" name="cuisine" value=""/>All
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="1"/>North Indian
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="2"/>South Indian
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="3"/>Chinese
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="4"/>Street Food
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="5"/>Fast Food
                    </label>
                </div>
            </>
        )
    }
}

export default CuisineFilter