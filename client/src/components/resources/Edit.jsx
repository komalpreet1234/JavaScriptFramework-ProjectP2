import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {
	
	const id = props.location.state.id;
	const [inputs, setInputs] = useState({
		Title: '',
		Subject: '',
		Content: ''
	});
	
	const [redirect, setRedirect] = useState(false);
	
	
	useEffect(() => {
    (async () => {
      const resResp = await Axios.get(`/resources/${id}`);
      if (resResp.status === 200) setInputs(resResp.data);
    })();
  }, []);

	
	const handleSubmit = async event => {
	event.preventDefault();
	try{
		
	const resp = await Axios.post('/resources/update',inputs);
	if(resp.status === 200)
	{
        toast("New Note updated Successfully", {
          type: toast.TYPE.SUCCESS
        });
		setRedirect(true);
	}
	else{
        toast("There was some issue while updating note", {
          type: toast.TYPE.ERROR
        });
	}
    } catch (error) {
      
        toast("There was some issue while updating note", {
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
			<h1>Edit Note</h1>
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
				<button type="submit" className="btn btn-primary">Update</button>
			</Form.Group>
		</Form>
		</div>
		</Container>
	);
};

export default Edit;