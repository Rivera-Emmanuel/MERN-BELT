const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			minlength: [3, "Name must be at least 3 characters long"]
		},

		type: {
			type: String,
			required : [true, "Pet type must be included!"],
			minlength: [3, "Pet type must be at least 3 characters long"]
		},

		description: {
			type: String,
			required : [true, "Description must be included!"],
			minlength: [3, "Description must be at least 3 characters long"]
		},

		skills: {
			type: Array
		}

	},

		{timestamps: true}
);

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;