const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");  // Import bcrypt for password hashing

// Define the User schema
const UserSchema = new mongoose.Schema({
    fullName : {type: String, required:true},       // Full name of the user
    email : {type: String, required:true, unique:true}, // Email of the user, must be unique
    password : {type: String, required:true},       // Password of the user, must be provided

},
{timestamps:true}            // Enable timestamps for createdAt and updatedAt fields
);

//Hash password before saving
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password"))  return next();  // If the password is not modified, skip hashing
    // If the password is modified, hash it

    this.password = await bcrypt.hash(this.password, 10);  // Hash the password with a salt of 10 rounds
    next();
    });

// Method to compare passwords while logging in
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);  // Compare the provided password with the hashed password
};

module.exports = mongoose.model("User", UserSchema);  // Export the User model
// This model can be used to interact with the 'users' collection in the MongoDB database
    