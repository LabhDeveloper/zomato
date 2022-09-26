import React from 'react';
import {Link} from 'react-router-dom';
import './QuickSearch.css';

const QuickDisplay = (props) => {

    const listMeal  = ({mealData}) => {
        if(mealData){
            return mealData.map((item) => {
                return(
                    <Link to={`/listing/${item.mealtype_id}`} key={item._id}>
                        <div id="main">
                            <div className="tileContainer">
                                <div className="tileComponent1">
                                    <img src={item.meal_image} alt={item.mealtype}/>
                                </div>
                                <div className="tileComponent2">
                                    <div className="componentHeading">
                                        <span ><ins>{item.mealtype}</ins></span>
                                    </div>
                                    <div className="componentSubHeading">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
    }

    return(
        <>
            {listMeal(props)}
        </>
    )
}

export default QuickDisplay;