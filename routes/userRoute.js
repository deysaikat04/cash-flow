const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
    const { name, email, googleId, imageUrl } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        return res.json({
            id: user.id,
            name: name,
            email: email,
            googleId: googleId,
            imageUrl: imageUrl
        });

    } else {

        user = new User({
            name,
            email,
            googleId,
            imageUrl
        });

        let saved = await user.save();
        res.json({
            id: saved.id,
            name: name,
            email: email,
            googleId: googleId,
            imageUrl: imageUrl
        });
    }

});


router.get('/user/:email', async (req, res) => {
    const { email } = req.params;

    let user = await User.findOne({ email });

    if (user) {
        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            googleId: user.googleId,
            imageUrl: user.imageUrl
        });
    } else {
        return res
            .status(400)
            .json({ error: { msg: "User doesn't exist" } });
    }

})






module.exports = router;