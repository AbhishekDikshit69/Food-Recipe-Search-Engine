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
        console.log(this.likes);
        return like;
    }
    deleteLike(id){
      const index=this.likes.findIndex(i=>i.id===id);
      this.likes.splice(index,1);
    }

    isLiked(id){
        const index=this.likes.findIndex(i=>i.id===id);
        console.log(index);
        return index==-1?false:true; 
    }
    getNumLikes(){
        return this.likes.length;
    }
}