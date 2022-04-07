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

    var marker = new mapboxgl.Marker();

    function add_marker(event) {
        var coordinates = event.lngLat;
        console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
        marker.setLngLat(coordinates).addTo(map);
    }

    map.on('click', add_marker);


    //Code voorbeeld: https://codepen.io/wavyknife/pen/mENvpG
    map.on('load', function () {
        // Add a GeoJSON source containing the state polygons.
        map.addSource('states', {
            'type': 'geojson',
            'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
        });

        // Add a layer showing the state polygons.
        map.addLayer({
            'id': 'states-layer',
            'type': 'fill',
            'source': 'states',
            'paint': {
                'fill-color': 'rgba(200, 100, 240, 0)'
            }
        });
    });


    // When a click event occurs near a polygon, open a popup at the location of
    // the feature, with description HTML from its properties.
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['states-layer']
        });
        if (!features.length) {
            return;
        }

        var feature = features[0];

        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(e.point))
            .setHTML(feature.properties.name)
            .addTo(map);

    });

    // Use the same approach as above to indicate that the symbols are clickable
    // by changing the cursor style to 'pointer'.
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['states-layer']
        });
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });
}

setTimeout(() => {
    const landFilter = document.querySelector('.mapboxgl-ctrl-geocoder--input')
    landFilter.addEventListener('input', e => {
        const {
            value
        } = e.target
        const landnaam = document.querySelectorAll('.country-name')
        // bron: Florin Pop tutorial how to make a filter
        landnaam.forEach(name => {
            if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
                name.parentElement.parentElement.parentElement.style.display = 'block'
            } else {
                name.parentElement.parentElement.parentElement.style.display = 'none'
            }
        })
    })
}, 18000)