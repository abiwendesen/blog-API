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

}

export const deletePost = (req,res)=>{

}

export const updatePost = (req,res)=>{

}