const express = require('express');
const router = express.Router();
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { pin } = (req.body);
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

        let user = await User.findOne({ ip });

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
                        });
                    }
                );
            }

        } else {

            user = new User({
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
                        token
                    });
                }
            );
        }

    } catch (err) {
        return res.json({ message: 'Error occured! Please try again.' });
    }

});


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
                .json({ error: { msg: "User doesn't exist" } });
        }
    } catch (err) {
        res.status(404).json({ error: { message: 'Invalid token' } })
    }

})


module.exports = router;