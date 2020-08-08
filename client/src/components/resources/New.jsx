import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const New = function () {
	
	const [inputs, setInputs] = useState({
		Title: '',
		Subject: '',
		Content: ''
	});
	
	const [redirect, setRedirect] = useState(false);
	
	const handleSubmit = async event => {
	event.preventDefault();
	try{
		
	const resp = await Axios.post('/api/resources',inputs);
	if(resp.status === 200)
	{
        toast("New Note Created Successfully", {
          type: toast.TYPE.SUCCESS
        });
		setRedirect(true);
	}
	else{
        toast("There was some issue while creating new note", {
          type: toast.TYPE.ERROR
        });
	}
    } catch (error) {
      toast("There was an issue creating the blog", {
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
			<h1>New Note</h1>
		</header>
		<hr/>
		<div>
		<Form onSubmit={handleSubmit}>
			<Form.Group>
			<Form.Label>Title:</Form.Label>
				<Form.Control 
					name="Title"
					onChange={handleInputChange}
					value={inputs.Title} />
			</Form.Group>
			<Form.Group>
				<Form.Label>Subject:</Form.Label>
					<Form.Control 
						name="Subject"
						onChange={handleInputChange}
						value={inputs.Subject}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Content:</Form.Label>
					<Form.Control 
						name="Content"
						onChange={handleInputChange}
						value={inputs.Content}/>
			</Form.Group>
			<Form.Group>
				<button type="submit" className="btn btn-primary">Submit</button>
			</Form.Group>
		</Form>
		</div>
		</Container>
	);
};

export default New;