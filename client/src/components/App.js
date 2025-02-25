import React from 'react';
import Routes from './Routes';
import { useState } from 'react';
import Nav from './shared/Nav'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [user, setUser] = useState(false);
  return (
    <React.Fragment>
		<ToastContainer/>
		<Nav user={user}/>
		<Routes user={user} setUser={setUser}/>
    </React.Fragment>
  );
}

export default App;
