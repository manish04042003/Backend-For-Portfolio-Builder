const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const { Users } = require('./schema.js');
const {signup, login} = require('./api/onboarding.js')
const{upload,imageupload} = require('./api/uploade.js')
const app = express();
const PORT_NO = 3000;
const secret = "123";

app.use(bodyParser.json());

const authenticateToken = async (req,res,next)=>{
    let token = req.header('Authorization');
    try{
        const data = await jwt.verify(token,secret);
        req.data = data;
        next();
    }catch(err){
        res.json({
            massage : "error",
            error : err
        })
    }
    
}
async function gettoken(data){
    const token = await jwt.sign(data,secret,{ expiresIn: '1h'});
    return token;
}

// onboarding routers
app.post('/signup',signup);
app.post('/login', login)

// uploade image 
app.post('/api/upload',upload.single('file'),imageupload);





app.listen(PORT_NO,()=>{
    console.log("server is nunning on port no " + PORT_NO);
})
