import { db } from "../db.js";


export const getUsers = (req,res)=>{
const query = "SELECT *FROM user";

db.query(query, (err,data)=>{
  if(err){
    return res.json(err)
}

  return res.status(200).json(data);

})

}