const express = require('express')
const router = express.Router();
require('../cinbect')
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send(" hello homepage in router")
})

router.post('/send', async (req, res) => {
    const { name, cost } = req.body;
    if (!name || !cost) {
        return res.status(422).json({ error: "Error please filed all properties" })
    }
    try {
        const response = await User.findOne({ name: name })
        if (response) {
            return res.status(422).json({ error: 'already exist' })
        }
        const user = new User({ name, cost })
        const userData = await user.save();
        // console.log(userData);
        res.status(201).json({ message: 'user field sucessfull', userData })
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/getAll', async (req, res) => {
    try {
        const response = await User.find();
        return res.status(200).json({ response: response });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const response = await User.findByIdAndRemove(req.params.id);
        return res.status(200).json({ msg: 'Your expanse has been deleted' });
    } catch (error) {
        return res.status(500).json({ errors: error, msg: error.message });
    }
});

module.exports = router;