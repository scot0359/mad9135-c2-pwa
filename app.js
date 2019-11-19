'use strict'

const app = {

    getWeather () {

        const weatherList = document.getElementById('weather')

        fetch('https://api.openweathermap.org/data/2.5/weather?id=6094817&units=metric&appid=6b946f5ab13e66777272d40e11089ff3')
            .then(response => response.json())
            .then(function(data) {
                console.log(data)
                const weather = data;

                const h2 = document.createElement('h2')

                h2.innerHTML = Math.round(weather.main.temp) + "&#186C"

                weatherList.appendChild(h2)

            })
            .catch(function(error){
                console.log(error)
            })

    },

}

app.getWeather()

  