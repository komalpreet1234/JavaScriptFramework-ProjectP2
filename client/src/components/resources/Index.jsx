import React, { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Index = function ({user}) {

	const [resour, setResour] = useState([]);
	
	useEffect(() => {
	(async () => {
	await getResour();
	})();
	}, []);
	

	const getResour = async () => {
		const reso = await Axios.get('/resources');
		console.log(reso);
		if( reso.status === 200 ) setResour(reso.data);
		
	};
	
	const deleteResource = async resource => {
    try {
      const resp = await Axios.post('/resources/delete', {
        id: resource._id
      });
		toast("Note deleted Successfully", {
          type: toast.TYPE.SUCCESS
        });
      await getResour();
    } catch (error) {
		
		toast("There was an Error Deleting Note", {
          type: toast.TYPE.ERROR
        });
    }
  };
	
	return (
	<Container className="my-5">
	<header>
		<h1>Notes</h1>
	</header>
	<hr/>
  <div className="content">
  {resour && resour.map((resource,i) => (
      <div className="card my-5">
        <div className="card-header">
          <h2 className="card-title">
		  {resource.Title}
          </h2>
        </div>

        <div className="card-body">
        <h4>{resource.Subject}</h4>
          <p className="card-text">
		  {resource.Content}
		  </p>
        </div>
            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/resources/edit",
                  state: {
                    id: resource._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteResource(resource)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
      </div>
  ))}
  </div>
	</Container>
	);	
};

export default Index;