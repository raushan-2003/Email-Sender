const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sendMail = require('./sendMail/index'); 
require('dotenv').config(); 
const app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Middleware to validate request body
const validateRequestBody = (req, res, next) => {
    const { email, subject, text } = req.body;
    if (!email || !subject || !text) {
        return res.status(400).json({ error: 'Missing required fields in request body' });
    }
    next();
};

app.get('/',(req,res)=>{
    res.render('index',{event: ''});
})

// Apply middleware to the sendMail route
app.post('/sendMail', validateRequestBody, async (req, res) => {
    try {
        console.log("Request : ", req.body);
        const { email, subject, text } = req.body;
        const result = await sendMail(email, subject, text);
        // res.status(result.statusCode).json(result.body);
        res.render('index',{event : result})
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(port, () => {
    console.log('Server start at port 3000');
});
