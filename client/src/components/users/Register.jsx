import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = function () {
	
	const [inputs, setInputs] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		emailConfirmation: '',
		passwordConfirmation: ''
	});
	
	const [redirect, setRedirect] = useState(false);
	
	const handleSubmit = async event => {
	event.preventDefault();
	try{
		
	const resp = await Axios.post('/users',inputs);
	if(resp.status === 200)
	{
        toast("You have been successfully registered", {
          type: toast.TYPE.SUCCESS
        });
		setRedirect(true);
	}
	else{
        toast("There was some issue while Registering", {
          type: toast.TYPE.ERROR
        });
	}
    } catch (error) {
      toast("There was an issue Registering", {
        type: toast.TYPE.ERROR
      });
    }
	};
	
	const handleInputChange = async event => {
	event.persist();
	
	const { name, value } = event.target;
	
	setInputs(inputs => ({
		...inputs,
		[name]: value
		}));
	};
	
	if (redirect) return (<Redirect to="/resources"/>);
	
	return (
	<Container className="my-5">
		<header>
			<h1>New User</h1>
		</header>
		<hr/>
		<div>
		<Form onSubmit={handleSubmit}>
			<Form.Group>
			<Form.Label>First name:</Form.Label>
				<Form.Control 
					name="firstName"
					onChange={handleInputChange}
					value={inputs.firstName} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Last name:</Form.Label>
					<Form.Control 
						name="lastName"
						onChange={handleInputChange}
						value={inputs.lastName}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>email:</Form.Label>
					<Form.Control 
						name="email"
						type="email"
						onChange={handleInputChange}
						value={inputs.email}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>email Confirmation:</Form.Label>
					<Form.Control 
						name="emailConfirmation"
						type="email"
						onChange={handleInputChange}
						value={inputs.emailConfirmation}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>password:</Form.Label>
					<Form.Control 
						type="password"
						name="password"
						onChange={handleInputChange}
						value={inputs.password}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>password Confirmation:</Form.Label>
					<Form.Control 
						type="password"
						name="passwordConfirmation"
						onChange={handleInputChange}
						value={inputs.passwordConfirmation}/>
			</Form.Group>
			<Form.Group>
				<button type="submit" className="btn btn-primary">Submit</button>
			</Form.Group>
		</Form>
		</div>
		</Container>
	);
};

export default Register;