export default class Likes{
    constructor(){
        this.likes=[];
    }
    addLike(id,title,author,img){
        const like={
            id,
            title,
            author,
            img
        }
        this.likes.push(like);
        this.persistentdata();
        return like;
    }
    deleteLike(id){
      const index=this.likes.findIndex(i=>i.id===id);
      this.likes.splice(index,1);
      this.persistentdata();
    }

    isLiked(id){
        const index=this.likes.findIndex(i=>i.id===id);
        return index==-1?false:true; 
    }
    getNumLikes(){
        return this.likes.length;
    }

    persistentdata(){
        localStorage.setItem("likes",JSON.stringify(this.likes));
    }
    readStorage(){
        // Restoring the content from local storage 
        const storage=JSON.parse(localStorage.getItem("likes"));
        if(storage){
            this.likes=storage;
        }
    }
}