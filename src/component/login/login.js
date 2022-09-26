import React,{Component} from 'react';
import Header from '../../Header';

const url = "https://zom-jwt.herokuapp.com/api/auth/login";

class Login extends Component{

    constructor(props){
        super(props)

        this.state={
            email:'',
            password:'',
            message:''
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
        .then((res) => res.json())
        .then((data) => {
            if(data.auth === false){
                this.setState({message:data.token})
            }else{
                sessionStorage.setItem('ltk',data.token)
                this.props.history.push(`/`)
            }
        })
    }

    render(){
        return(
            <>
                <Header/>
                <hr/>
                <div className="container">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            Login
                        </div>
                        <div className="panel-body">
                            <h3 style={{color:'red'}}>{this.state.message}</h3>
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
                            <button className="btn btn-info" onClick={this.handleSubmit}>Login</button>
                        </div>
                        
                    </div>
                </div>
            </>
        )
    }
}

export default Login

