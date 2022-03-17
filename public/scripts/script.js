// JavaScript Document
var Hamburgermenu = document.querySelector(".toggle-button");
var navigatie = document.querySelector(".links");

Hamburgermenu.addEventListener("click", openmenu);

function openmenu() {
    navigatie.classList.toggle("active");

}


//Het maken van de filter heb ik gebruik gemaakt van meerdere toturials: zie bronnen (resources) Wiki
const countriesEl = document.getElementById('countries');
const filterknop = document.getElementById('filter');
const regioknoppen = filterknop.querySelectorAll('li');
const zoekveld = document.getElementById('search');
const filtertaal = document.getElementById('filter2');
const taalknoppen = filtertaal.querySelectorAll('li');

// fetch de API, wacht met het doen van de functie displayCountries totdat de data is gefetched en in json file is gezet
getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.com/v2/all');
    const countries = await res.json();

    /*displayCountries(countries);*/
}
/*  
function displayCountries(countries) {
    /* haal 'een moment geduld weg' 
    countriesEl.innerHTML = '';
    /* countries for each is een loop *
    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('card');

        countryEl.innerHTML =
            `        
            
                 <div class="">
                 <form action = "/mijnlijst" method = "post">
                    <div>
                        <img src="${country.flag}" alt="germany">
                    </div>

                    <div class="card-body">
                    <h2 class="country-name">${country.name}</h2>
                    <p class="country-region"><strong>Regio:</strong>
                            ${country.region}
                        </p>
                    <p class ="country-language"><strong>Taal:</strong>
                            ${country.languages[0].name}
                        </p>
                        <label for="land">Land:</label>
                            <input type="text" name="land" id="land" value="${country.name}">

                        <label for="populatie">Populatie:</label>
                            <input type="text" name="populatie" id="populatie" value="${country.population}">
                        
                        <label for="regio">Regio:</label>
                            <input type="text" name="regio" id="regio" value="${country.region}">
 
                        <label for="capital">Hoofdstad:</label>
                            <input type="text" name="capital" id="capital" value="${country.capital}">

                        <label for="language">Taal:</label>
                            <input type="text" name="language" id="language"  value="${country.languages[0].name}">

                       
                    </div>
                    <input type = "submit" value = "Submit">
                    </form>
                </div>`;

        //stuur de landen door op de manier hierboven
        countriesEl.appendChild(countryEl);
    });
}*/

// info voor in de console zodat ik naar de data kan kijken
getinfo();

async function getinfo() {
    const res = await fetch('https://restcountries.com/v2/all');
    const countries = await res.json();

    console.log(countries);
}

//zoek een land
zoekveld.addEventListener('input', e => {
    const {
        value
    } = e.target;
    const landnaam = document.querySelectorAll('.country-name');
    // bron: Florin Pop tutorial how to make a filter
    landnaam.forEach(name => {
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            name.parentElement.parentElement.parentElement.style.display = 'block';
        } else {
            name.parentElement.parentElement.parentElement.style.display = 'none';
        }
    });
});

// openen en sluiten met display block en none in de css voor regio
filterknop.addEventListener('click', () => {
    filterknop.classList.toggle('open');
});

// de filter op regio knop
regioknoppen.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const landregio = document.querySelectorAll('.country-region');

        landregio.forEach(region => {
            if (region.innerText.includes(value) || value === 'All') {
                region.parentElement.parentElement.parentElement.style.display = 'block';
            } else {
                region.parentElement.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});

// openen en sluiten met display block en none in de css voor taal
filtertaal.addEventListener('click', () => {
    filtertaal.classList.toggle('open');
});

taalknoppen.forEach(filter2 => {
    filter2.addEventListener('click', () => {
        const value = filter2.innerText;
        const talen = document.querySelectorAll('.country-language');

        talen.forEach(talen => {
            if (talen.innerText.includes(value) || value === 'All') {
                talen.parentElement.parentElement.parentElement.style.display = 'block';
            } else {
                talen.parentElement.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});



/* code om de hele lijst van de api in een dropdown te krijgen
let countries; // hier zit de data in

fetch("https://restcountries.com/v2/all")
    .then(res => res.json())
    .then(data => initialize(data))
    .catch(err => console.log("error", err));

function initialize(countriesData) {
    countries = countriesData;

    let taal = "";
    for (let i = 0; i < countries.length; i++) {
        taal += `<option value="${countries[i].alpha3Code}">${countries[i].languages[0].name}</option>`;
    }
    document.getElementById("language").innerHTML = taal;

} */





/*

oude code! (ander probeersel)

let countries; // hier zit de data in

fetch("https://restcountries.com/v2/all")
    .then(res => res.json())
    .then(data => initialize(data))
    .catch(err => console.log("error", err));


function initialize(countriesData) {
    countries = countriesData;

    let land = "";
    for (let i = 0; i < countries.length; i++) {
        land += `<option value="${countries[i].alpha3Code}">${countries[i].name} (+${countries[i].callingCodes[0]})</option>`;
    }
    document.getElementById("countries").innerHTML = land;

    let valuta = "";
    for (let i = 0; i < countries.length; i++) {
        valuta += `<option value="${countries[i].alpha3Code}">${countries[i].timezones[0]}</option>`;
    }
    document.getElementById("timezone").innerHTML = valuta;

    let regio = "";
    for (let i = 0; i < countries.length; i++) {
        regio += `<option value="${countries[i].alpha3Code}">${countries[i].region}</option>`;
    }
    document.getElementById("regio").innerHTML = regio;

    let taal = "";
    for (let i = 0; i < countries.length; i++) {
        taal += `<option value="${countries[i].alpha3Code}">${countries[i].languages[0].name}</option>`;
    }
    document.getElementById("language").innerHTML = taal;

}

/*
    .then((results) => {

        return results.json();

    })

    .then((data) => {

        console.log(data);

    }); */





/*
function getCountries() {

    fetch("https://restcountries.com/v2/all")

        .then((results) => {

            return results.json();

        })

        .then((data) => {

            displayCountries(countries);

        });

}

getCountries();
*/

/* 
                 <div class="">

                    <div>
                        <img src="${country.flag}" alt="germany">
                    </div>
                    <div class="card-body">
                        <h2 class="country-name">${country.name}</h2>
                        <p><strong>Populatie:</strong>
                            ${country.population}
                        </p>
                        <p class="country-region"><strong>Regio:</strong>
                            ${country.region}
                        </p>
                        <p><strong>Hoofdstad:</strong>
                            ${country.capital}
                        </p>
                        <p class ="country-language"><strong>Taal:</strong>
                            ${country.languages[0].name}
                        </p>
                    </div>
                </div>`; */