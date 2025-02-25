import React from 'react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';

const Logout = ({setUser}) => {

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await Axios.get('/api/logout');

        if (resp.status === 200) {
          setUser(false);
          toast("You have successfully logged out", {
            type: toast.TYPE.SUCCESS
          });
          setRedirect(true);
        }
      } catch (error) {
        toast("There was an error while attempting to log you out", {type: toast.TYPE.ERROR});
      }
    })();
  }, []);

  if (redirect) return (<Redirect to="/"/>);
  return null;
};

export default Logout;