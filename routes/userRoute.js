const express = require('express');
const router = express.Router();
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { name, email, pin } = (req.body);
    var ip = '';

    try {
        var IPs = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        if (IPs.indexOf(":") !== -1) {
            IPs = IPs.split(":")[IPs.split(":").length - 1]
        }
        ip = IPs.split(",")[0];

        let user = await User.findOne({ email });

        if (user) {
            res.status(404).json({ message: 'This email is already in use! Please use another email.' })
        } else {

            user = new User({
                name,
                email,
                ip
            });
            const salt = await bcrypt.genSalt(10);

            user.pin = await bcrypt.hash(pin, salt);

            let saved = await user.save();

            const payload = {
                user: {
                    id: saved.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: '7 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token, name, email
                    });
                }
            );
        }

    } catch (err) {
        return res.json({ message: 'Error occured! Please try again.' });
    }

});


router.post('/login', async (req, res) => {
    const { email, pin } = (req.body);

    try {

        let user = await User.findOne({ email });



        if (user) {
            const isMatch = await bcrypt.compare(pin, user.pin);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: 'Invalid Credential' });
            } else {
                const payload = {
                    user: {
                        id: user.id
                    }
                };
                jwt.sign(
                    payload,
                    config.get('jwtSecret'),
                    { expiresIn: '7 days' },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            name: user.name,
                            email
                        });
                    }
                );
            }
        } else {
            return res
                .status(400)
                .json({ message: 'Yor are not registerd! Please signup to continue.' })
        }
    } catch (err) {
        res.status(404).json({ message: 'Invalid token' })
    }

})

router.get('/getUser', auth, async (req, res) => {

    const userId = req.user.id;

    try {

        let user = await User.findById(userId);

        if (user) {
            return res.json({
                id: user.id,
            });
        } else {
            return res
                .status(400)
                .json({ message: "User doesn't exist" });
        }
    } catch (err) {
        res.status(404).json({ message: 'Invalid token' });
    }

});


module.exports = router;