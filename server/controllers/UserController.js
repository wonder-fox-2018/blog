const UserModel = require('../models/UserModel.js')
const helpers = require('../helpers/helpers.js')

const UserController = {

    register: (req, res) => {

        UserModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: helpers.hash(req.body.password),
            })
            .then((result) => {
                res.status(201).json(result)
            }).catch((err) => {
                res.status(400).json(err)
            });
    },

    login: (req, res) => {

        UserModel.findOne({
                email: req.body.email
            })
            .exec()
            .then((user) => {

                if (user && helpers.compareSync(req.body.password, user.password)) {
                    let token = helpers.createToken({
                        id: user._id.toString()
                    })
                    res.status(200).json({
                        message: "Login Success",
                        token: token,
                        user: user
                    })
                } else if (user !== null && req.body.password !== user.password) {
                    res.status(400).json({
                        message: "Wrong Password"
                    })
                } else {
                    res.status(400).json({
                        message: "Wrong email & Password"
                    })
                }
            })
            .catch(err => {
                res.status(402).json(err);
            });
    },

    findOneById(req, res){
        
        var id = req.params.id
        UserModel.findById(id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({
                        message: 'No such User'
                    });
                }
                return res.json(user);
            }).catch((err) => {
                res.status(500).json({
                    message: 'Error when getting User.',
                    error: err
                });
            });

    },

    verify(req, res){
        var token = req.params.token
        let decoded = helpers.decodeToken(token)
        if (decoded.id) {
            req.params.id = decoded.id
            UserController.findOneById(req,res)
        } else {
            res.status(300).json({
                message: 'Invalid User Creditial'
            })
        }
    }


}

module.exports = UserController