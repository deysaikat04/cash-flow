const express = require('express');
const router = express.Router();
const User = require('../models/User');
var jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

router.post('/register', async (req, res) => {
    const { name, email, googleId, imageUrl } = (req.body);

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
            { expiresIn: '7 days' },
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
            { expiresIn: '7 days' },
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


router.get('/getUser', auth, async (req, res) => {

    const userId = req.user.id;

    try {

        let user = await User.findById(userId);

        if (user) {
            return res.json({
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