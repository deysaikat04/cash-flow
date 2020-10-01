const express = require('express');
const router = express.Router();
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const config = require('config');

router.post('/register', async (req, res) => {
    const { name, email, googleId, imageUrl } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    id: user.id,
                    name: name,
                    imageUrl: imageUrl
                });
            }
        );

    } else {

        user = new User({
            name,
            email,
            googleId,
            imageUrl
        });

        let saved = await user.save();

        const payload = {
            user: {
                id: saved.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    id: saved.id,
                    name: name,
                    imageUrl: imageUrl
                });
            }
        );
    }

});


router.post('/getUser', async (req, res) => {

    const { token } = req.body;

    try {
        var decoded = jwt.verify(token, config.get('jwtSecret'));
        const userId = decoded.user.id;
        let user = await User.findById(userId);

        if (user) {
            return res.json({
                token,
                id: user.id,
                name: user.name,
                imageUrl: user.imageUrl
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