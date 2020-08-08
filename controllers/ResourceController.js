// INSTRUCTIONS:
/*
  Create a new resource controller that uses the
  User as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  The resource controller must contain the 7 resource actions:
  - index
  - show
  - new
  - create
  - edit
  - update
  - delete
*/

const viewPath = 'resources';
const Resource = require('../models/Resource');
const User = require('../models/User');

exports.index = async (req, res) => {
  try {
	  
    const reso = await Resource
      .find()
      .populate('user')
      .sort({updatedAt: 'desc'});
	  
	  console.log(reso);
	  
	res.status(200).json(reso);
	
  } catch (error) {
	res.status(400).json({message: 'There was an error displaying Notes',error});
  }
};

exports.show = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('user');
	  
	res.status(200).json(resource);
	
  } catch (error) {
	res.status(400).json({message: 'There was an error displaying Note ',error});
  }
};

exports.new = (req, res) => {
	
};

exports.create = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});
    const resource = await Resource.create({user: user._id, ...req.body});
	res.status(200).json(resource);
  } catch (error) {
	  res.status(400).json({message: 'There was an error creating a Note',error});
  }
};

exports.edit = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    res.status(200).json(resource);
  } catch (error) {
    req.flash('danger', `There was an error Editing The Note: ${error}`);
    res.redirect('/');
  }
};

exports.update = async (req, res) => {
  try {
    const { user: email } = req.session.passport;
    const user = await User.findOne({email: email});

    let resource = await Resource.findById(req.body.id);
    if (!resource) res.status(400).jason({message: "Note not Available"});

    const attributes = {user: user._id, ...req.body};
    await Resource.validate(attributes);
    await Resource.findByIdAndUpdate(attributes.id, attributes);
	res.status(200).json(resource);
  } catch (error) {
    res.status(400).jason({message: "update error"});
  }
};

exports.delete = async (req, res) => {
  try {
    await Resource.deleteOne({_id: req.body.id});
    res.status(200).json({message: "Successfully Deleted"});
  } catch (error) {
    res.status(400).jason({message: "Error While Deleted"});
  }
};