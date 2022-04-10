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

/* https://stackoverflow.com/questions/12194435/cannot-set-property-display-of-undefined */
var cssfilter = document.getElementsByClassName('cssfilter');
for (var i = 0; i < cssfilter.length; i += 1) {
    cssfilter[i].style.display = 'none';
}