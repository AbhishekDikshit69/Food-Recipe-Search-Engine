import Search from './modules/Search';
import * as searchView from './views/searchView';
import {elements,renderLoader,clearLoader} from './views/base';
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
       await state.search.getResult();
        // 5.Render result on UI
        clearLoader();
        searchView.renderResult(state.search.result);
        

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
})

