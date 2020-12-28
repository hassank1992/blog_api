
const PATH ="./data.json";
const fs = require('fs')

class Post{
Post()
{
this.data;
}
     
    get()
    {
        return this.readData();
        //get list of post
    }
    getIndiviualPost(id){
        const posts=this.readData();
    const currentPost = posts.find((post)=>post.id==id);
    return currentPost;
    }
    add(newPost){
        const currentPosts=this.get();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
        console.log("data store successfully");
    }
    readData(){
        let rawData=fs.readFileSync(PATH);
        let posts =JSON.parse(rawData);
        return posts;
        
    }
    storeData(rawData){
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH, data);
    }
}

module.exports=Post;