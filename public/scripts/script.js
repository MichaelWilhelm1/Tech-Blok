// JavaScript Document
var Hamburgermenu = document.querySelector(".toggle-button");
var navigatie = document.querySelector(".links");

Hamburgermenu.addEventListener("click", openmenu);

function openmenu() {
    /* 
    
    Eerste oplossing:
    if (navigatie.style.display === "none") {
        navigatie.style.display = "block";
    } else {
        navigatie.style.display = "none";
    }
*/

    navigatie.classList.toggle("active");

}


const countriesEl = document.getElementById('countries');
const filterknop = document.getElementById('filter');
const regioknoppen = filterknop.querySelectorAll('li');
const zoekveld = document.getElementById('search');

getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.com/v2/all');
    const countries = await res.json();

    displayCountries(countries);
}

function displayCountries(countries) {
    /* empty string */
    countriesEl.innerHTML = '';
    /* countries for each is een loop */
    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('card');

        countryEl.innerHTML =
            `               
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
                        <p><strong>Taal:</strong>
                            ${country.languages[0].name}
                        </p>
                    </div>
                </div>`;

        countriesEl.appendChild(countryEl);
    });
}

getinfo();

async function getinfo() {
    const res = await fetch('https://restcountries.com/v2/all');
    const countries = await res.json();

    console.log(countries);
}

// openen en sluiten met display block en none in de css
filterknop.addEventListener('click', () => {
    filterknop.classList.toggle('open');
});

//zoek een land
zoekveld.addEventListener('input', e => {
    const {
        value
    } = e.target;
    const landnaam = document.querySelectorAll('.country-name');

    landnaam.forEach(name => {
        if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
            name.parentElement.parentElement.style.display = 'block';
        } else {
            name.parentElement.parentElement.style.display = 'none';
        }
    });
});

// de filter op regio knop
regioknoppen.forEach(filter => {
    filter.addEventListener('click', () => {
        const value = filter.innerText;
        const landregio = document.querySelectorAll('.country-region');

        landregio.forEach(region => {
            if (region.innerText.includes(value) || value === 'All') {
                region.parentElement.parentElement.style.display = 'block';
            } else {
                region.parentElement.parentElement.style.display = 'none';
            }
        });
    });
});



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