let favouritesMovies = [];

const adverts= [
    'Nowy film:Zielona Mila, w kinach od 20 września!',
    'Zapraszamy do kin juz od 23 czerwca!',
    'Festiwal filmowy już od poniedziałku w kinie Burleska!',
    'Filmowy wieczór z kinem Adriatyk już dziś!',
    'Brakujące Ogniwo to nowy film Scorsese, nie możesz go przegapić!'
];

let lastId = 0;
let foundMovie = null;
createAdvert()

function onAddBtnClick(){
    let movieNameInput=document.querySelector('#movieNameInput');
    // model
    let movie = {
        id: lastId,
        name: movieNameInput.value
    };
    lastId++;
    favouritesMovies.push(movie);
    // UI
    updateFavouritesList();
    updateMoviesCounter();
}

function onRemoveBtnClick(event){
    // model
    favouritesMovies = favouritesMovies.filter(function(elem){
        return elem.id !== Number(event.target.id);
        
    })
    // UI
    updateFavouritesList();
    updateMoviesCounter();
}

function onEditBtnClick(currentMovie){
    const fvElem = document.getElementById(`container-${currentMovie.id}`);
    fvElem.innerHTML=`<input id='save-${currentMovie.id}' value=${currentMovie.name}></input><button onclick='onNewValueSave(${currentMovie.id})'>Zapisz</button>`;
}

function onNewValueSave(id) {
    let newValueElem = document.getElementById(`save-${id}`);
    let newMovieName = newValueElem.value;
    
    // model
    let movieToChange = favouritesMovies.find(function(elem){
        return elem.id === id;
    })
    movieToChange.name = newMovieName;

    // UI
    updateFavouritesList();
}

function updateMoviesCounter(){
    let moviesCounter = document.getElementById('moviesCounter')
    moviesCounter.innerText = favouritesMovies.length;
}

function updateFavouritesList(){
    let favouritesList = document.getElementById('favouritesList');
    favouritesList.innerText='';
    favouritesMovies.forEach(function(movie, index){
        let favouriteElem = document.createElement('li');
        favouriteElem.id = `container-${movie.id}`;

        let paragraph = document.createElement('p');
        paragraph.innerText = movie.name;
        favouriteElem.appendChild(paragraph);

        let deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Usuń';
        deleteBtn.id = movie.id;
        deleteBtn.addEventListener('click', onRemoveBtnClick);
        favouriteElem.appendChild(deleteBtn);

        let editBtn = document.createElement('button')
        editBtn.innerText = 'Edytuj';
        editBtn.id = `editbtn-${movie.id}`;
        editBtn.addEventListener('click', function(){
            onEditBtnClick(movie);
        });
        favouriteElem.appendChild(editBtn);

        favouritesList.appendChild(favouriteElem);
    })
}

function createAdvert() {
    let advertsContainer = document.querySelector('#advertsContainer');
    let advert = document.createElement('p');
    advert.innerText = adverts[0];

    setInterval(function(){
        let randomIndexFromZeroToFour = parseInt(Math.random() * 10 % adverts.length);
        advert.innerText = adverts[randomIndexFromZeroToFour];
    }, 2000);

    advertsContainer.appendChild(advert);
};

function onSearchBtnClick(){
    let searchElem = document.getElementById('movieSearchNameInput');
    fetch (`http://www.omdbapi.com/?apikey=7015f6d&t=${searchElem.value}`).then(resp => resp.json()) .then((response) => {

        console.log(response);

        foundMovie = {
        title: response.Title,
        poster: response.Poster,
        year: response.Year
        }   

        let container = document.getElementById("foundMovieContainer");
        container.innerHTML = `<p>${foundMovie.title}</p>
                            <p>${foundMovie.year}</p>
                            <img src=${foundMovie.poster}></img>
                            <button onclick=onAddToFavouritesClicked()> Dodaj do ulubionych</button>`
    })
};

function onAddToFavouritesClicked() {
        let movie = {
            id: lastId,
            name: foundMovie.title,
        };
        lastId++;
        favouritesMovies.push(movie);
        // UI
        updateFavouritesList();
        updateMoviesCounter();
}
