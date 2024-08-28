let logo = document.querySelector('.navbar-brand');
let container = document.querySelector('.main-container');
let input = document.querySelector('.form-control');
let btn = document.querySelector('.btn');
logo.addEventListener('click', () => {
    location.reload();
});
let navLink_Text = 'everything';
let navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach((navLink) => {
    navLink.addEventListener('click', () => {
       navLink_Text = navLink.innerText;
       apiData();
    });
});
btn.addEventListener('click', () => {
    navLink_Text = input.value;
    console.log(input.value);
    console.log(navLink_Text);
    apiData();
});
let remove = [];
const apiData = async () => {
    const URL = `https://newsapi.org/v2/everything?q=${navLink_Text}&apiKey=31c224d1efdc4c79bb18b9328a31302a`;
    let data = await fetch(URL);
    let response = await data.json();
    container.innerHTML = '';
    for(let article of response.articles) {
        let section = document.createElement('section');
        section.innerHTML = `<a href="#" class="main-src" target="_blank">
                                <div class="card">
                                    <div class="card-img">
                                        <img src="default_img.avif" class="card-img-top" alt="card img">
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    </div>
                                </div>
                             </a>`
        container.append(section);
    }
    let i = 0;
    let $titles = document.querySelectorAll('.card-title');
        $titles.forEach(($title) => {
        $title.innerText = response.articles[i].title;
        i += 1;
    });
    i = 0;
    let subTitles = document.querySelectorAll('.card-subtitle');
        subTitles.forEach((subTitle) => {
        subTitle.innerText = response.articles[i].publishedAt;
        i += 1;
    });
    i = 0;
    let sources = document.querySelectorAll('.main-src');
    sources.forEach((source) => {
        source.setAttribute('href', response.articles[i].url);
        i += 1;
    });
    i = 0;
    let description = document.querySelectorAll('.card-text');
        description.forEach((text) => {
        text.innerText = response.articles[i].description;
        i += 1;
    });
    i = 0;
    let images = document.querySelectorAll('.card-img-top');
        images.forEach((img) => {
            img.setAttribute('src', response.articles[i].urlToImage);
            i += 1;
        });
        i = 0;
    let sections = document.querySelectorAll('section');
    if(sections.length == response.articles.length) {
        _remove();
    }
}
    
const _remove = () => {
    let removeTitle = document.querySelectorAll('.card-title');
    removeTitle.forEach(removetitle => {
        if(removetitle.innerText == '[Removed]') {
            let parent1 = removetitle.parentElement;
            let parent2 = parent1.parentElement;
            let parent3 = parent2.parentElement;
            let parent4 = parent3.parentElement;
            parent4.remove();
        }
    });
} 
if(navLink_Text == 'everything') {
    apiData();
}