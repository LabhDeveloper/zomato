import React from 'react';

const OrderDisplay = (props) => {

    const renderTable = ({orderData}) => {
        if(orderData){
            return orderData.map((item) => {
                return(
                    <tr key={item.id} style={{color: 'white',fontSize: '15px'}}>
                        <td>{item.order_id}</td>
                        <td>{item.brand_name}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>&#8377; {item.cost}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                        <td>{item.bank_name}</td>
                    </tr>
                )
            })
        }
    }

    return(
        <div className="container" style={{marginBottom: 100}}>
            <center><h2 style={{textAlign: 'center',color: 'red',fontSize: '35px'}}>Orders</h2></center>
            <table className="table">
                <thead>
                    <tr style={{color: 'white',fontSize: '20px'}}>
                        <th>OrderId</th>
                        <th>Rname</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Cost</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>BankName</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props)}
                </tbody>
            </table>
        </div>
    )
}

export default OrderDisplay