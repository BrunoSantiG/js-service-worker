const mockedName = ['BH', 'SP', 'RJ']

window.addEventListener('load', () => {
    document.querySelector('ul#weather').innerHTML = '';
    Promise.all([fetchWeather(), fetchWeather(), fetchWeather()])
        .then(responses => {
            responses.forEach((response,index) => {
                response.json()
                    .then(data => {
                        const sortedData = data.sort((a,b)=>a-b)
                        const li = `<li>${mockedName[index]}: 
                                ${sortedData[0]}C -
                                ${sortedData[1]}C</li>`;
                        document.querySelector('ul#weather').innerHTML += li;
                    })
            })
        })
});

function fetchWeather() {
    return fetch('https://www.randomnumberapi.com/api/v1.0/random?min=0&max=40&count=2');
}