
const router = require('express').Router();
const qs = require('querystring');
const axios = require('axios');
const jwt = require("jwt-simple");
const {users} = require('../db/models')
try{
    require('dotenv').config('../.env');
}
catch(ex){
    console.log(ex);
}

const redirect_uri = (process.env.NODE_ENV === 'production') ? 'https://capstone-arfla.herokuapp.com/api/google/callback' : 'http://localhost:3000/api/google/callback';
const emailScope = 'https://www.googleapis.com/auth/userinfo.email';
const userScope = 'https://www.googleapis.com/auth/userinfo.profile';

router.get('/callback', async (req, res, next) => {
    try {
        const { data } = await axios.post( 'https://www.googleapis.com/oauth2/v4/token', {
            code: req.query.code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: 'authorization_code',
            redirect_uri,
        });
        const { data: _user } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${data.access_token}`,
                },
        });

        const values = {
            googleId: _user.id,
            email: _user.email,
            firstName: _user.given_name,
            lastName: _user.family_name,
            location: _user.locale
        };

        const user = await users.findUser(values);

        const homeRedirect = (process.env.NODE_ENV === 'production') ? 'https://capstone-arfla.herokuapp.com' : 'http://localhost:3000';

        console.log('home redirect:', homeRedirect);
        
        if(user){
            //Able to create token but page refresh is not occurring on front end
            const token = await jwt.encode({ id: user.id, role: user.role, username: user.username, firstName: user.firstName, lastName: user.lastName }, process.env.JWT)
            res.write(`
            <script>
                const homeRedirect = '${homeRedirect}';
                const token = '${token}';
                const myStorage = window.localStorage;
                myStorage.setItem('token', token);
                window.location.replace(homeRedirect)
            </script>
            `);
        } else {
            //Able to create token but page refresh is not occurring on front end
            const newUser = await users.createGoogleUser(values);
            const token = await jwt.encode({ id: newUser.id, role: newUser.role, username: newUser.username, firstName: newUser.firstName, lastName: newUser.lastName }, process.env.JWT);
            res.write(`
                <script>
                    const homeRedirect = '${homeRedirect}/#google';
                    const token = '${token}';
                    const myStorage = window.localStorage;
                    myStorage.setItem('token', token);
                    window.location.replace(homeRedirect)
                </script>
            `);
        }
        
        
    }
    catch (error) {
        next(error);
    }
});

router.get('/', (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
        response_type: 'code',
        scope: `${emailScope} ${userScope}`,
        redirect_uri,
        client_id: process.env.GOOGLE_CLIENT_ID
    })}`;

    res.redirect(url)
})

module.exports = {router}