import React,{Component} from 'react';
import axios from 'axios';
import './filter.css'

const url = "https://zomat-api.herokuapp.com/filter";


class CostFilter extends Component{

    filterCuisine = (event) => {
        let mealId = this.props.mealId;
        let cost = (event.target.value).split('-')
        let lcost = cost[0];
        let hcost = cost[1];
        let costUrl;
        if(event.target.value === ""){
            costUrl = `${url}/${mealId}`
        }else{
            costUrl = `${url}/${mealId}?hcost=${hcost}&lcost=${lcost}`
        }
        axios.get(costUrl)
        .then((res) => {this.props.restPerCost(res.data)})
    }
    
    render(){
        return(
            <>
                <center className="si">
                    Cost Filter
                </center>
                <div className="toy" style={{marginLeft:"15%"}} onChange={this.filterCuisine}>
                    <label className="radio">
                        <input type="radio" name="cuisine" value=""/>All
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="100-299"/>100-299
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="300-599"/>300-599
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="600-999"/>600-999
                    </label>
                    <label className="radio">
                        <input type="radio" name="cuisine" value="1000-5000"/>1000-5000
                    </label>
                </div>
            </>
        )
    }
}

export default CostFilter