const mockedName = ['San Diego', 'Sacramento', 'Fresno']

window.addEventListener('load', () => {
    document.querySelector('ul#weather').innerHTML = '';
    Promise.all([fetchWeather(), fetchWeather(), fetchWeather()])
        .then(responses => {
            responses.forEach((response,index) => {
                response.json()
                    .then(data => {
                        let li
                        if(data[0].error){
                            li = `<li>Offiline</li>`
                        }else{
                            const sortedData = data.sort((a,b)=>a-b)
                            li = `<li>${mockedName[index]}: 
                            ${sortedData[0]}C -
                            ${sortedData[1]}C</li>`;
                        }
                            
                        document.querySelector('ul#weather').innerHTML += li;
                    })
            })
        })
});

function fetchWeather() {
    return fetch('https://www.randomnumberapi.com/api/v1.0/random?min=0&max=40&count=2').catch(err=> {
        document.querySelector('ul#weather').innerHTML += `<li>Offline</li>`
    });
}