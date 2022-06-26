const { User, Thought } = require("../models");
const { User } = require("../routes/api/userRoutes");

module.exports = {
	// Get all users
	getUsers(req, res) {
		User.find()
			.then((courses) => res.json(courses))
			.catch((err) => res.status(500).json(err));
	},
	// Get a user by id
	getSingleUser(req, res) {
		User.findOne({ _id: req.params.userId })
			.select("-__v")
			.then((course) => (!course ? res.status(404).json({ message: "No user with that ID" }) : res.json(course)))
			.catch((err) => res.status(500).json(err));
	},
	// Create a user
	createUser(req, res) {
		User.create(req.body)
			.then((course) => res.json(course))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Delete a user
	deleteUser(req, res) {
		User.findOneAndDelete({ _id: req.params.userId })
			.then((user) => (!user ? res.status(404).json({ message: "No user with that ID" }) : Thought.deleteMany({ _id: { $in: user.thoughts } })))
			.then(() => res.json({ message: "User and thoughts deleted!" }))
			.catch((err) => res.status(500).json(err));
	},
	// Update a user
	updateUser(req, res) {
		User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true })
			.then((course) => (!course ? res.status(404).json({ message: "No user with this id!" }) : res.json(course)))
			.catch((err) => res.status(500).json(err));
	},
};
