import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Register from './users/Register';

import Resour from './resources/Index'
import NewResour from './resources/New'
import EditResour from './resources/Edit'

function Routes ({user, setUser}) {
	return (
	<Switch>
		<Route exact path="/" component={Home}/>
		<Route exact path="/login" render={
			renderProps => <Login
			{...renderProps}
			setUser={setUser}
			/>
		}/>
		<Route exact path="/users/new" render={
			renderProps => <Register
			{...renderProps}
			setUser={setUser}
			/>
		}/>
		<Route exact path="/logout" render={
			renderProps => <Logout
			{...renderProps}
			setUser={setUser}
			/>
		}/>
		<Route exact path="/resources" render={
			renderProps => <Resour
			{...renderProps}
			user={user}
			/>
		}/>
		<Route exact path="/resources/new" component={NewResour}/>
		<Route exact path="/resources/edit" component={EditResour}/>
	</Switch>
	);
}
	
export default Routes;