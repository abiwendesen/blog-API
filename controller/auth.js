import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


export const register = (req, res)=>{
    
const query = "SELECT *FROM user WHERE email = ? OR userName = ?";
db.query(query,[req.body.email,req.body.userName], (error,data)=>{
    if(error){ 
        return res.json(error);
    }
    if(data.length){
        return res.status(409).json("User already exists");
    }

//encrypting user password 

 const salt = bcrypt.genSaltSync(10);
 const hash = bcrypt.hashSync(req.body.password, salt);

 const insertQuery = "INSERT INTO user(`userName`,`email`,`password`,`FirstName`,`LastName`) VALUES(?)"
const values = [
    req.body.userName,
    req.body.email,
    req.body.firstName,
    req.body.lastName,
    hash
 ]
 db.query(insertQuery,[values],(err, data)=>{
    if(err){ 
        return res.json(err);
    }
    else{
         return res.status(200).json("User has been created");
    }
    
 })
})

}


export const login = (req,res)=>{

    const querylogin = "SELECT *FROM user where userName=?"
    db.query(querylogin,[req.body.userName], (err, data)=>{
        if(err) return res.json(err);
        
        if(data.length === 0) { return res.status(404).json("User not found!")}
 
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password);

        if(!isPasswordCorrect) { return res.status(400).json("Wrong username or password!")}
    
      const token = jwt.sign({ id: data[0].id },"jwtkey");
      const {password, ...other} = data[0];

      res.cookie("access_token",token ,{
        httpOnly:true
      }).status(200).json(other);

    })

}

export const logout = (req,res)=>{
 
    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has logged out ");

}