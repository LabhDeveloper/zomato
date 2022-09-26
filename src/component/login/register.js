import React,{Component} from 'react';
import Header from '../../Header';

const url = "https://zom-jwt.herokuapp.com/api/auth/register";

class Register extends Component{

    
    constructor(props){
        super(props)


        this.state={
            name:'',
            email:'',
            password:'',
            phone:''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value})
    }

    handleSubmit = () => {
        fetch(url,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(this.state)
        })
        .then(this.props.history.push('/'))
    }

    render(){
        return(
            <>
                <Header/>
                <hr/>
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            Register
                        </div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label htmlFor="fname" className="control-label">Name</label>
                                <input className="form-control" id="fname" name="name" placeholder="name" value={this.state.name}
                                onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="control-label">Email</label>
                                <input className="form-control" id="email" name="email" placeholder="email" value={this.state.email}
                                onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="control-label">Password</label>
                                <input className="form-control" id="password" name="password" placeholder="password" value={this.state.password}
                                onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="control-label">Phone</label>
                                <input className="form-control" id="phone" name="phone" placeholder="phone" value={this.state.phone}
                                onChange={this.handleChange}/>
                            </div>
                            <button className="btn btn-success" onClick={this.handleSubmit}>Register</button>
                            
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}

export default Register