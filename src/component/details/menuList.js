import React,{Component} from 'react';
import './details.css'
class MenuDisplay extends Component {

    orderId = [];

    placeOrder = (id) => {
        this.orderId.push(id);
        this.props.finalOrder(this.orderId)
    }

    removeOrder = (id) => {
        if(this.orderId.indexOf(id)>-1){
            this.orderId.splice(this.orderId.indexOf(id),1)
        }
        this.props.finalOrder(this.orderId)
    }

    renderCart = (orders) => {
        if(orders){
            return orders.map((item,index) => {
                return(
                    <b key={index}>{item}&nbsp;</b>
                )
            })
        }
    }




    renderMenu = ({menudata}) => {
        if(menudata){
            return menudata.map((item) => {
                return (
                    <div  key={item.menu_id} >
                        <div className="col-md-7" id="hax"style={{marginBottom:5,marginTop:3}}>
                            <b>{item.menu_id} - </b>
                            <img src={item.menu_image} alt="menuimg "style={{height:80,width:80,borderRadius:15}}/> &nbsp;
                            {item.menu_name} -- &#8377;{item.menu_price}
                        </div>
                        <div className="col-md-4" style={{marginBottom:5,marginTop:14}}>
                            <button className="btn btn-success"
                            onClick={() => {this.placeOrder(item.menu_id)}}>
                                <span className="glyphicon glyphicon-plus"></span>
                            </button>&nbsp;
                            <button className="btn btn-danger"
                             onClick={() => {this.removeOrder(item.menu_id)}}>
                                <span className="glyphicon glyphicon-minus"></span>
                            </button>
                        </div>
                    </div>

                )
            })
        }
    }

    render(){
        return(
            <div>
                <div className="col-md-12 bg-success" id="box">
                    <h1>Item Added</h1>
                    <h4>Item Number {this.renderCart(this.orderId)} Added</h4>
                </div>
                <div className="col-md-12 bg-info" id="bax">
                    {this.renderMenu(this.props)}
                </div>
            </div>
        )
    }
}

export default MenuDisplay