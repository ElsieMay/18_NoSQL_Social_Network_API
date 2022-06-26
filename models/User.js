const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: "Email address is required",
			trim: true,
		},
		email: {
			type: String,
			unique: true,
			required: "Email address is required",
			validate: [validateEmail, "Please fill a valid email address"],
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
		},
		id: false,
	}
);

const User = model("user", userSchema);

module.exports = userSchema;
