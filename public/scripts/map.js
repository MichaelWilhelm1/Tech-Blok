mapboxgl.accessToken =
    'pk.eyJ1IjoibWljaGFlbHdpbGhlbG0iLCJhIjoiY2wxb3c3cWI5MTFjaDNpcXIwMm01NjBucSJ9.en0DvVzxucNF8YK1qwKURQ';

navigator.geolocation.getCurrentPosition(successLocatie, errorLocatie, {
    enableHighAccuracy: true
})

function successLocatie(position) {
    console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocatie() {
    setupMap([4.897070, 52.377956])
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 14
    })

    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            language: 'en-EN',
            mapboxgl: mapboxgl
        }));


}

const filter = document.getElementsByClassName('mapboxgl-ctrl-geocoder--input');
filter.addEventListener('input', e => {
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