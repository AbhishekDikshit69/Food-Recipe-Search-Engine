import axios from 'axios';

export default class {
    constructor(query){
        this.query=query;
    }
    async getResult(query){
        try {
            let proxy ='https://cors-anywhere.herokuapp.com/';
            console.log(this.query);
            const result =await axios(`${proxy}https://recipesapi.herokuapp.com/api/search?q=${this.query}`);
            this.result=result.data.recipes;
        }
        catch (error){
            console.log(error);
        }
        
    }
}