// @ts-nocheck
import { Router } from 'express';
import { db } from './db';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

const router = new Router();
router.post('/login', async (req, res) => {

    // does user exist
    let user = db
        .get('users')
        .find({ username: req.body.username })
        .value()

    if (user) {
        const valid = await bcrypt.compare(req.body.password, user.password)

        if (valid) {

            const bytes = CryptoJS.AES.decrypt(user.userkey, process.env.SECRET);
            const DECRYPTED_USER_KEY = bytes.toString(CryptoJS.enc.Utf8);

            const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_);
            console.log('token', token);

            res.send({
                token: token,
                userkey: DECRYPTED_USER_KEY
            });

        } else {
            res.status(403).send('No data for you!');
        }

    } else {
        res.status(400).send('Whoopsie!');
    }


})
router.get('/isloggedin', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];

    let resObj = {
        loggedIn: false
    }

    try {
        if(token) {
            const verified_user = jwt.verify(token, process.env.JWT_KEY);
            if(verified_user) {
                resObj.loggedIn = true;
                resObj.user = verified_user
            }
            res.status(200).send(resObj); 
        } else {
            res.status(403).send(resObj);
        }
    } catch (error) {
        res.status(403).send(resObj);
    }
})



module.exports = router;