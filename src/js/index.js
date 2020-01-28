import Search from './modules/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';
import Recipe from './modules/Recipe';
import * as recipeView from './views/recipeView';
/* Global state of the application
Contains
1. search object
2. current recipe object
3.shopping list object
--liked object */
const state ={

};
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
        recipeView.renderRecipe(state.recipe);
        
        }
        catch(error){
            alert("ID not found");
        }   
        // Get recipe data
        
    }
}

window.addEventListener("hashchange",controlRecipe);