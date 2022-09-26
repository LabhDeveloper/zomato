import React,{Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './details.css';
import MenuDisplay from './menuList';
import Header from '../../Header';

const rurl = "https://zomat-api.herokuapp.com/details";
const murl = "https://zomat-api.herokuapp.com/menu";

class Details extends Component {

    constructor(){
        super()

        this.state={
            details:'',
            menuList:'',
            mealId:sessionStorage.getItem('mealId'),
            userItem:''
        }
    }

    addToCart = (data) => {
        this.setState({userItem:data})
    }

    proceed = () => {
        sessionStorage.setItem('menu',this.state.userItem);
        this.props.history.push(`/placeOrder/${this.state.details.restaurant_name}`)
    }

    render(){
        // let details = this.state.details
        let {details} = this.state
        return(
            <>
                <Header/>
                <div className="mainContent">
                    <div className="imgDiv">
                        <img src={details.restaurant_thumb} alt="images"/>    
                    </div>
                    <div className="contentDiv">
                        <h1>{details.restaurant_name}</h1>
                        <span>231 Customers Say {details.rating_text}</span>
                        <h4><del>Old Price : Rs.1000</del></h4>
                        <h3>New Price : Rs.{details.cost}</h3>
                        <h3>Fresh and Delicious Dishes, Enjoy Here </h3>
                        <div className="feature_container">
                            <figure>
                                <img src="http://i.ibb.co/wJvrhYg/veg.png" alt = "veg "className="featureIcon"/>
                                <figcaption style={{marginLeft:"20px",color:"white"}}>Pure veg</figcaption>
                            </figure>
                            <figure>
                                <img src="http://i.ibb.co/mD3jpgc/sentizied.png" alt = "veg "className="featureIcon"/>
                                <figcaption style={{marginLeft:"20px",color:"white"}}>Fully Senatized</figcaption>
                            </figure>
                        </div>
                        <Tabs>
                            <TabList>
                            <Tab>Contact</Tab>
                            <Tab>About Us</Tab>
                            </TabList>

                            <TabPanel>
                            <h2>Phone : {details.contact_number}</h2>
                            <p>Address : {details.address}</p>
                            </TabPanel>
                            <TabPanel>
                            <h2>{details.restaurant_name}</h2>
                            <p>.....</p>
                            <p>....</p>
                            <p>...</p>
                            </TabPanel>
                        </Tabs>
                        <div className="her">
                            <button className="btn btn-success" onClick={this.proceed}>Process</button>&nbsp;
                            <Link to={`/listing/${this.state.mealId}`} className="btn btn-danger">&#8592;</Link>
                            
                        </div>
                    </div>
                </div>
                <div className="">
                    <MenuDisplay menudata={this.state.menuList}
                    finalOrder={(data)=>{this.addToCart(data)}}/>
                </div>
            </>
        )
    }
    async componentDidMount() {
        let restId = this.props.location.search.split('=')[1];
        let response = await axios.get(`${rurl}/${restId}`)
        let menudata = await axios.get(`${murl}/${restId}`)
        this.setState({details:response.data[0],menuList:menudata.data})
    }
}

export default Details