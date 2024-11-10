function createMap() {
    var map = L.map('map').setView([38.984641169829914, -76.94906303604276], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    for (step = 1; step <= 3; step += 1) {
        addText(step, map)

    }

}

function addText(step, map) {
    var randomLat = getRandomInRange(30, 35, 3);
    var randomLong = getRandomInRange(-90, -100, 3);
    var marker = L.marker([randomLat, randomLong]).addTo(map);

    console.log(`Step right before fetch: ${step}`)

    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${randomLat}&longitude=${randomLong}&localityLanguage=en`)
        .then((res) => res.json())
        .then((resJson) => {
            const para = document.createElement("h2");
            console.log(`Step inside the .then: ${step}`)
            const node = document.createTextNode(`Marker ${step}: Latitude: ${randomLat}, Longitude: ${randomLong}`);
            para.appendChild(node);

            const element = document.getElementById("postMapSpace");
            element.appendChild(para);

            const para2 = document.createElement("h3");
            const node2 = document.createTextNode(`Locality: ${resJson.locality}`);
            para2.appendChild(node2);

            const element2 = document.getElementById("postMapSpace");
            element2.appendChild(para2);

        })
    console.log(`Step right after appending elements: ${step}`)
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

window.onload = createMap;
