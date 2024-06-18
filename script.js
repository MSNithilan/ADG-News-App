//external api kay

const API_KEY="216f96140a504e87beaa9b9b2cfc6557";
const url="https://newsapi.org/v2/everything?q="
//load first page
window.addEventListener('load',()=>getNews("International"));
//reload function when logo is pressed
function reload(){
    window.location.reload();
}
//send request to external api
async function getNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}
//populate flash cards
function bindData(articles){
    const newsCards=document.getElementById('newscards');
    const newsCardTemp=document.getElementById('news-card-temp');
    newsCards.innerHTML='';
    articles.forEach((article)=>{
        if(!article.urlToImage){
            return;
        }
        const cloneCard=newsCardTemp.content.cloneNode(true);
        fillCardData(cloneCard,article);
        newsCards.appendChild(cloneCard);
    })
}
//fill data in cards
function fillCardData(cloneCard,article){
    const newsImg=cloneCard.querySelector('#newsimg');
    const newsTitle=cloneCard.querySelector('#news-title');
    const newsSource=cloneCard.querySelector('#news-source');
    const newsDesc=cloneCard.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name} - ${date}`;
    cloneCard.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}
//to highlight selected menu tab
let navSelected=null;
function onNavClick(id){
    getNews(id);
    const navItem=document.getElementById(id);
    navSelected?.classList.remove('active');
    navSelected=navItem;
    navSelected.classList.add('active');
}
const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-input');
searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query){
        return;
    }
    getNews(query);
    navSelected?.classList.remove('active');
    navSelected=null;
})

const regionButton=document.getElementById('region-button');
const regionText=document.getElementById('region-select');
regionButton.addEventListener('click',()=>{
    const query=regionText.value;
    if(!query){
        return;
    }
    getNews(query);
    navSelected?.classList.remove('active');
    navSelected=null;
})
