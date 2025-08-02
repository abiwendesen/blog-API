import{db} from '../db.js';

export const getPosts = (req,res)=>{
const query = "SELECT *FROM posts";
db.query(query,(err,data)=>{
    if(err) { return res.send(err) }

    return res.status(200).json(data);
})
}

export const getPost = (req,res)=>{

const query = "SELECT user.userName, posts.title, posts.description, posts.image, posts.date FROM user JOIN posts ON user.iduser=posts.iduser WHERE posts.iduser=?";
db.query(query,[req.params.id],(err,data)=>{
    if(err){return res.send(err)}

    return res.status(200).json(data[0]);
})
}

export const addPost = (req,res)=>{
const query = "Insert into posts(`title`,`description`,`image`,`iduser`) value(?,?,?,?)";
db.query(query,[req.body.title,req.body.description,req.body.image,req.params.id], (err,data)=>{
    if(err){ return res.status(400).send(err)}

    return res.status(200).json(data);
})
}

export const deletePost = async(req,res)=>{
  const query = "DELETE FROM posts where postId = ?"
  db.query(query,[req.params.id],(err,data)=>{
    if(err){
        return res.status(400).json({message:err})
    }
    res.status(200).json({message:"Deleted Sucessfully"})
 })
}

export const updatePost = (req,res)=>{
    

}