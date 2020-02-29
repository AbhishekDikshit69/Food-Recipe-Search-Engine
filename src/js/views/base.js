export const elements={
    searchForm:document.querySelector('.search'),
    searchInput:document.querySelector(".search__field"),
    resultList:document.querySelector(".results__list"),
    searchRes:document.querySelector('.results'),
    searchResPages:document.querySelector('.results__pages'),
    recipe:document.querySelector(".recipe"),
    shopping:document.querySelector(".shopping__list"),
    likesmenu:document.querySelector(".likes__field"),
    likeslist:document.querySelector(".likes__list")
}
export const renderLoader=parentElement=>{
const loader= `
<div class ="loader">
<svg>
    <use href="img/icons.svg#icon-cw"></use>
</svg>
</div>
`;
    parentElement.insertAdjacentHTML("afterbegin",loader);
}
export const clearLoader=()=>{
    const loader=document.querySelector(".loader");
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}