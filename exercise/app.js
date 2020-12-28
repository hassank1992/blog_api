const express= require("express");
const app = express();
const Post =require("./api/model/post");
const multer = require('multer');

app.use(express.json());
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,`${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  })
  var upload = multer({storage:storage})

const postData = new Post();
const getExt =(mimeType)=>{
    switch(mimeType)
    {
        case "image/png":
        return ".png";
        case "image/jpeg":
        return ".jpeg";

    }
}
 

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
})
app.use('/uploads',express.static('uploads'))
app.get("/",(req,res)=>{
    res.status(200).send("hello world");
})
app.get("/api/posts/:post_id",(req,res)=>{
    const postId=req.params.post_id;
     const currentPost=postData.getIndiviualPost(postId);
     if(currentPost)
     {
        res.status(200).send(currentPost);
     }else{
        res.status(404).send("Blog not found");
     }
    
    
})
app.get("/api/posts",(req,res)=>{
    res.status(200).send(postData.get());
})
app.post("/api/posts",upload.single('post-image'),(req,res)=>{
  let updatedPath =`${req.file.path}`;
  let p=updatedPath.replace("\\","/");
      const newPost={
        "id":`${Date.now()}`,
        "title":req.body.title,
        "content":req.body.content,
        "post_image":p,
        "added_date":`${Date.now()}`,   
     }
  
    postData.add(newPost);
     res.status(201).send("ok");
})

app.listen(3000,()=>console.log("Listening on http://localhost:3000"));