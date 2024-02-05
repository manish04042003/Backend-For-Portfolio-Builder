
const {Users} = require('../schema')

const signup =async (req,res)=>{
    let {email,password,name,username} = req.body;
    let check = await Users.findOne({email});
    if(check){
        res.status(200).json({
            massage : "already exist"
        })
    }else{
        let token = await gettoken({username});
        const user = new Users({email,password,name,username})
        await user.save();
        res.status(200).json({
            massage : "success",
            token : token
        })
    }  
}


const login = async (req,res)=>{
    let {email,password} = req.body;
    let check = await Users.findOne({email});
    console.log(check)
    if(check){
        if(check.password===password){
            let token = await gettoken({username :check.username});
            res.status(200).json({
                massage : "success",
                token : token
            })
        }else{
            res.status(200).json({
                massage : "Password Incorrect"
            })
        }
    }else{
        res.status(404).json({
            massage : "user not exist",
        })
    }  
}



module.exports = { signup,login}