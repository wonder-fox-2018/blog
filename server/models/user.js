var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const encryptPassword = require('../helpers/encryptPassword');

var userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: [true, 'password must be unique'],
        required: true,
        validate: [
            function (val) {
    
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                
                return re.test(val);
            },
            function(val) {
                console.log(val, 'INI VALIDATOR 2');
            }
        
        ]  
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate:[
            function(val) {
              /*   var re = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,}$"/;
                return re.test(val); */
            }
        ]
    }
}, {
    timestamps: true
});

userSchema.pre('validate', function(next) {
    if (this.password.split(' ').length > 1) {
        next(new Error('password can not contain a white space'));
    } else {
        next();
    }
});

userSchema.pre('save', function (next) {

    
    this.password = encryptPassword(this.password);
    next();

})



var User = mongoose.model('User', userSchema);

module.exports = User;