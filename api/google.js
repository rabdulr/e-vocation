
const router = require('express').Router();
const qs = require('querystring');
const axios = require('axios');
const keys = require('./google_keys.json');

const redirect_uri = 'http://localhost:3000/auth/google/callback';
const emailScope = 'https://www.googleapis.com/auth/userinfo.email';
const userScope = 'https://www.googleapis.com/auth/userinfo.profile';

router.get('/callback', async (req, res, next) => {
    try {
        const { data } = await axios.post( 'https://www.googleapis.com/oauth2/v4/token', {
            code: req.query.code,
            client_id: keys.client.id,
            client_secret: keys.client.secret,
            grant_type: 'authorization_code',
            redirect_uri
        });
        const { data: _user } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },
            }
        });
        const values = {
            googleId: _user.id,
            email: _user.email,
            firstName: _user.given_name,
            lastName: _user.family_name,
        }
        console.log(data, values);
    }
    catch (error) {
        next(error);
    }
});

module.exports = {router}