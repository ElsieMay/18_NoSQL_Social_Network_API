const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// reaction field's subdocument schema in the `Thought` model
const reactionSchema = new Schema(
	{
		reactionBody: {
			type: String,
			required: true,
			maxlength: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
	},
	{
		// Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
		// Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// Schema to create Thought model
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			maxlength: 280,
			minlength: 1,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		username: {
			type: String,
			required: true,
		},
		//Array of nested documents created with the `reactionSchema`
		reactions: [reactionSchema],
	},
	{
		// Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
		// Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

// Creates a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

// Initialize our Thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
