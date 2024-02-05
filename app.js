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






// only for checking 


app.get('/checkupload', (req, res) => {
    res.send(`
      <h2>File Upload With <code>"Node.js"</code></h2>
      <form action="/api/upload" enctype="multipart/form-data" method="post">
        <div>Select a file: 
          <input type="text" name="firstname"/>
          <input type="file" name="file" multiple="multiple" />
        </div>
        <input type="submit" value="Upload" />
      </form>
    `);
  });

app.post('/checkusername', async (req,res)=>{
    let {username} = req.body;
    let check = await Users.findOne({username});
    let message = (check?true:false); 
    res.status(200).json({
        message : message
    })
})


app.get('/checktoken',authenticateToken,async(req,res)=>{
    let username = req.data.username;
    res.send(username);
})


app.listen(PORT_NO,()=>{
    console.log("server is nunning on port no " + PORT_NO);
})
