 mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        // center: [-74.5, 40], // starting position [lng, lat]
       center: campground.geometry.coordinates,
        zoom: 5 // starting zoom
    });

    map.addControl(new mapboxgl.NavigationControl());

// const marker = new mapboxgl.Marker()
//   .setLngLat([-74.5, 40])
//   .addTo(map);

// var marker = new mapboxgl.Marker({
//     color: "#0000ff",
//     draggable: true
//     })
//     // .setLngLat([-74.5, 40])
//     .setLngLat(campground.geometry.coordinates)
//     .addTo(map);

var marker = new mapboxgl.Marker({
    color: "#0000ff",
    draggable: true
    })
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset: 25})
        //    .setLngLat(e.lngLat)
           .setHTML(`<h3>${campground.title}</h3><P>${campground.location}</p>`)
           .setMaxWidth("300px")
    )
    .addTo(map);