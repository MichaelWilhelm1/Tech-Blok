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

//fetch("https://restcountries.com/v3.1/all")
//    .then(function (res) {
//        //console.log(res);
//        return res.json();
//    })
//    .then(function (data) {
//       //console.log(data);
//        initialize(data);
//    })
//    .catch(function (err) {
//        console.log("error", err);
//    });
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

function getUsers() {

    fetch("https://restcountries.com/v2/all")

        .then((results) => {

            return results.json();

        })

        .then((data) => {

            console.log(data);

        });

}

getUsers();