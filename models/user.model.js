const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "Email can't be empty",
        unique: true
    },
    password: {
        type: String,
        required: "Password can't be empty",
        minlength: [4, 'Password must be atleast 4 characters long']
    },
    age: Number,
    gender: String,
    address: String,
    prevHist: String,
    med1: String,
    med2: String,
    med3: String,
    med4: String,
    med5: String,
    image: String,
    saltSecret: String
});
userSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//METHODS
userSchema.methods.verifyPassword = function(password) {
    console.log('VERIFYING PWD')
    return bcrypt.compareSync(password, this.password);
}
userSchema.methods.generateJwt = function(){
    console.log('JWT PHASE')
    return jwt.sign({ _id: this._id }, 'SECRET#123', { expiresIn: '10h' });
}
module.exports = mongoose.model('user',userSchema);