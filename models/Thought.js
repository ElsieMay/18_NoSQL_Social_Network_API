const { Schema, model } = require("mongoose");

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

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
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

// Creates a virtual called `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
