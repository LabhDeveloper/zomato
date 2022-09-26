import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Footer from './Footer';
import Home from './component/Home/Home';
import Listing from './component/listing/listingApi';
import Details from './component/details/details';
import PlaceOrder from './component/booking/placeOrder';
import ViewOrder from './component/booking/viewOrder';
import Login from './component/login/login';
import Register from './component/login/register';

const Routing = () => {
    return(
        <BrowserRouter>
            <div>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/listing/:mealId" component={Listing}/>
                    <Route exact path="/details" component={Details}/>
                    <Route exact path="/placeOrder/:restName" component={PlaceOrder}/>
                    <Route exact path="/viewBooking" component={ViewOrder}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                <Footer/>
            </div>
        </BrowserRouter>
    )
}

export default Routing