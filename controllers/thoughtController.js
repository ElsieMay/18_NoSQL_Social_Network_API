const { User, Thought } = require("../models");

module.exports = {
	// Get all thoughts
	getThoughts(req, res) {
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err));
	},
	// Get a single user by id
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select("-__v")
			.then((thought) => (!thought ? res.status(404).json({ message: "No user with that ID" }) : res.json(thought)))
			.catch((err) => res.status(500).json(err));
	},
	// Create a user
	createThought(req, res) {
		Thought.create(req.body)
			.then((thought) => res.json(thought))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(err);
			});
	},
	// Delete a user
	deleteThought(req, res) {
		Thought.findOneAndDelete({ _id: req.params.thoughtId })
			.then((user) => (!user ? res.status(404).json({ message: "No thought with that ID" }) : Thought.deleteMany({ _id: { $in: user.thoughts } })))
			.then(() => res.json({ message: "Thoughts deleted!" }))
			.catch((err) => res.status(500).json(err));
	},
	// add a reaction
	addReaction(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true })
			.then((dbThoughtData) => {
				console.log(dbThoughtData);
				if (!dbThoughtData) {
					return res.status(404).json({ message: "no thought with this id" });
				}
				res.json(dbThoughtData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	},
	// Update a user
	updateThought(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
			.then((thought) => (!thought ? res.status(404).json({ message: "No thought with this id!" }) : res.json(thought)))
			.catch((err) => res.status(500).json(err));
	},
	// delete a reaction
	deleteReaction(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: req.body } }, { runValidators: true, new: true })
			.then((user) => (!user ? res.status(404).json({ message: "No thought with this id!" }) : res.json(user)))
			.catch((err) => res.status(500).json(err));
	},
};
