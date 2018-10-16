const User = require('../models/user');
const ServerResponse = require('../helpers/serverResponse');
const encryptPassword = require('../helpers/encryptPassword');
const Token = require('../helpers/token');

module.exports = {
    create: (req, res) => {
       
        let {first_name, last_name, email, password} = req.body;

        let user = new User({
            first_name,
            last_name,
            email,
            password
        });
    
        user.save()
            .then((newUser) => {
               
                ServerResponse.success(res, 201, 'user has been created');

            })
            .catch((err) => {
                ServerResponse.error(res, 400, err.toString());

            });
        
        
    },

    login: (req, res) => {
        req.body.password = encryptPassword(req.body.password);
        
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }).then((result) => {
            
            let token = Token.sign(result);
            
            if (result) {
                ServerResponse.success(res, 200, 'login', {token});
            } else {
                ServerResponse.error(res, 401, 'invalid email or password');
            }
        }).catch((err) => {
            ServerResponse.error(res, 400, err.toString());
        });
    }
};
