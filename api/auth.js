const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config.js');
const TIME = require('../constants/time.js');
const User = require('../db/models/user.js');

module.exports = function(app) {
    return {
        registration: (req, res) => {
            const {password, name, email, btd, login} = req.body;
            const hashedPassword = bcrypt.hashSync(password, 8);

            // creating new user
            User.create({
                name,
                login,
                email,
                btd,
                password: hashedPassword,
            }, (err, user) => {
                if (err) {
                    return res
                        .status(500)
                        .send('Server problem');
                }

                // creating token
                const token = jwt.sign({id: user._id, name: user.login}, config.secret, {expiresIn: TIME.DAY});

                res
                    .status(200)
                    .send({auth: true, token})
            })
        },
        isAuth: (req, res) => {
            const {userId} = req.data;
            User.findById(userId, (err, user) => {
                if (err) {

                    return res
                        .status(500)
                        .send('Problem with bd')
                }
                if (!user) {

                    return res
                        .status(404)
                        .send('User not found');
                }

                res
                    .status(200)
                    .send(user);
            })
        },
        login: (req, res) => {
            const {login, password} = req.body;

            User.findOne({login}, (err, user) => {
                if (err) {

                    return res
                        .status(500)
                        .send('Server error');
                }

                if (!user) {

                    return res
                        .status(404)
                        .send('User does not exist');
                }

                const passwordIsValid = bcrypt.compareSync(password, user.password);
                if (!passwordIsValid) {

                    return res
                        .status(401)
                        .send({auth: false, token: null})
                }

                const token = jwt.sign({id: user._id}, config.secret, {expiresIn: TIME.DAY});

                res
                    .status(200)
                    .send({auth: true, token})
            })
        }
    }
};