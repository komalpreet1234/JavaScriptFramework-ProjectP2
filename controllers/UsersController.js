const User = require('../models/User');
const viewPath = 'users';

exports.new = (req, res) => {
};

exports.create = async (req, res) => {
  const userDetails = req.body;
  req.session.flash = {};
  
  try {
	const newuser = new User(req.body);
    await User.register(newuser, req.body.password);
	res.status(200).json(newuser);
  } catch (error) {
	res.status(400).json({message: "Error registering user"});
  }
};