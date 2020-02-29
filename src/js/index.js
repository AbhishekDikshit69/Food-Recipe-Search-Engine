import Search from './modules/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';
import Recipe from './modules/Recipe';
import List from './modules/List';
import Likes from './modules/Likes';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
/* Global state of the application
Contains
1. search object
2. current recipe object
3.shopping list object
--liked object */
const state ={

};
window.state=state;
const controlSearch= async ()=>{
    // 1) Get query from view
    const query=searchView.getInput();
    if(query){
        
        //create a new search object and add it to state
        state.search=new Search(query);
        // 3. Prepare UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchRes);
        //4. Search for recepies
        try{
            await state.search.getResult();
            // 5.Render result on UI
            clearLoader();
            searchView.renderResult(state.search.result);
            
        }catch(err){
            alert("something went wrong with the search");
        }
      

    }
};
elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    controlSearch();
});
elements.searchResPages.addEventListener("click",e=>{
    const btn=e.target.closest('.btn-inline');
    if(btn){
        const goToPage=parseInt(btn.dataset.goto,10);
        searchView.clearResults();
        searchView.renderResult(state.search.result,goToPage);
        console.log(goToPage);
    }
});

// Recipe Controller 

const controlRecipe=async ()=>{
    // Getting Id from url
    const id=window.location.hash.replace("#","");
    // console.log(id);
    if(id){
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        //Highlight the selected search item 
        if(state.search)
            searchView.highlightSelected(id);
        // Create new recipe object
        state.recipe=new Recipe(id);
        window.rObject=state.recipe;
        try{
            await state.recipe.getRecipe();
             state.recipe.parseIngredients();
        // calculate serving time 
        state.recipe.calcTime();
        state.recipe.calcServing();
        console.log(state.recipe);
        //render recipe object
        clearLoader();
        recipeView.renderRecipe(state.recipe,state.likes.isLiked(id));
        
        }
        catch(error){
            console.error(error);
            alert("ID not found");
        }   
        // Get recipe data
        
    }
}

['hashchange','load'].forEach(event=>window.addEventListener(event,controlRecipe));

// Function to handle Shopping List
state.likes=new Likes();
const controlList=()=>{
    if(!state.list)
        state.list=new List();
    state.recipe.ingredients.forEach(e=>{
      let item=  state.list.addItem(e.count,e.unit,e.ingredient);
      listView.renderItem(item);
    }) 
}
// Function to handdle Likes
const controlLike =()=>{
    if(!state.likes)
        state.likes=new Likes();
    const currentid=state.recipe.id;
    // User hasnt liked this current recipe yet 
    if(!state.likes.isLiked(currentid)){
        console.log(state.likes.isLiked(currentid));
        // Add this recipe to the state-likes
       const like= state.likes.addLike(currentid,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
            );
        likesView.togglelikesbutton(true);
        likesView.renderLike(like);
        // Add it to the UI
    }else{
        
        // Remove this like from the state 
        state.likes.deleteLike(currentid);
        likesView.deleteLike(currentid);
        // toggle button 
        likesView.togglelikesbutton(false);
    }
    likesView.toggleLikeMenu (state.likes.getNumLikes());
}

// Handle delete and update count in shopping 

elements.shopping.addEventListener("click",e=>{
    const id=e.target.closest('.shopping__item').dataset.itemid;

    if(e.target.matches(".shopping__delete,.shopping__delete *")){
        // Delete from state
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }
    // Handle the count update
    else if(e.target.matches(".shopping-count-value")){
        const val=parseFloat(e.target.value);
        state.list.updateCount(id,val);

    }
})

elements.recipe.addEventListener("click",(e)=>{
    if(e.target.matches(".btn_decrease, .btn-decrease *")){
        if(state.recipe.serving >=1){
            state.recipe.updateServings("dec");
            recipeView.updateServingIngredients(state.recipe);
        }
    }
    else if(e.target.matches(".btn_increase, .btn-increase *")){
        state.recipe.updateServings("inc");
        recipeView.updateServingIngredients(state.recipe);
    }
    else if(e.target.matches(".recipe_btn_add,.recipe_btn_add *")){
        console.log("clicked");
        controlList();
    }else if(e.target.matches(".recipe__love,.recipe__love *")){
        controlLike();
    }
});
window.l=new List();
