import {elements} from './base';
export const getInput=()=>elements.searchInput.value;
export const clearInput=()=>elements.searchInput.value="";
export const clearResults=()=>{
elements.resultList.innerHTML="";
elements.searchResPages.innerHTML="";
};
const limitRecipeTitle=(title,limit=18)=>{
    const newtitle=[];
    if(title.length >limit){
        title.split(' ').reduce((acc,cur)=>{
            if(acc+cur.length<=limit)
                newtitle.push(cur);
            return acc+cur.length;
        },0);
       // console.log(newtitle.join(' '));
        return `${newtitle.join(' ')}...`
}
return title;
}
const renderRecipe=(recipe)=>{
    // console.log(recipe.title);
    // console.log(`${limitRecipeTitle(recipe.title)}`);
let markup = `
<li>
<a class="results__link" href="#${recipe.recipe_id}">
    <figure class="results__fig">
        <img src=${recipe.image_url} alt="Test">
    </figure>
    <div class="results__data">
        <h4 class="results__name"> ${limitRecipeTitle(recipe.title)} </h4>
        <p class="results__author">${recipe.publisher}</p>
    </div>
</a>
</li>
`;
elements.resultList.insertAdjacentHTML('beforeend',markup);
};
const createButton=(pageNo,type)=> `
<button class="btn-inline results__btn--${type}" data-goto=${type==='prev'? pageNo-1:pageNo+1}>
    <span>Page ${type==='prev'? pageNo-1:pageNo+1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type==='prev'? 'left':'right'}"></use>
    </svg>
    
</button>
`;
let button;
const renderButtons=(page,numResults,resultsPerPage)=>{
    const pages=Math.ceil(numResults/resultsPerPage);
    if(page==1  && pages>1){
        button =createButton(page,'next');
    }
    else if (page ==pages && pages>1){
        //only button for previous page
        button=createButton(page,'prev');
    }
    else{
        //both buttons
        button=`${createButton(page,'prev')}
                ${createButton(page,'next')}`;
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin",button);

}
export const renderResult =(recipes,page=1,resultsPerPage=10) =>{
    // console.log(recipes);
    let start=(page-1)*resultsPerPage,end=page * resultsPerPage;
    recipes.slice(start,end).forEach(renderRecipe);
    //Rendering Buttons
    renderButtons(page,recipes.length,resultsPerPage);
};