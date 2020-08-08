import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { Form, Container } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setUser}) => {
	const [ inputs, setInputs] = useState({
		email: '',
		password: ''
	});
	
	const [redirect, setRedirect] = useState(false);
	const handleSubmit = async event => {
		event.preventDefault();
		try
		{
		const resp = await Axios.post('/api/authenticate', inputs);
		if(resp.status === 200) {
		setUser(resp.data.user);
		toast("You have been successfully Logged in",{
			type: toast.TYPE.SUCCESS
		});
		setRedirect(true);
		}
		else{
		toast("ERROR! Please Check your credentials",{
			type: toast.TYPE.ERROR
		});
		}
		}catch(error) 
		{
		toast("ERROR! Please Check your credentials",{
			type: toast.TYPE.ERROR
		});
		}
	};
	
	const handleInputChange = async event => {
		event.persist();
		const {name, value} = event.target;
		setInputs( inputs => ({...inputs,[name]: value}))
	};
	if (redirect) return <Redirect to="/resources/"/>
	return (
<Container>
  <header>
    <h1>Login</h1>
  </header>

  <hr/>

  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <label htmlFor="email">Email:</label>
      <Form.Control type="email" name="email" required onChange={handleInputChange} value={inputs.email}/>
    </Form.Group>
  
    <Form.Group>
      <label htmlFor="password">Password:</label>
      <Form.Control type="password" name="password" required onChange={handleInputChange} value={inputs.password}/>
    </Form.Group>
  
    <Form.Group>
      <button className="btn btn-primary">Submit</button>
    </Form.Group>
  </Form>
</Container>
	);
};
export default Login;