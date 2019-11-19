'use strict'

const app = {

    weatherList: [],

    getWeather () {

        fetch('https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=6b946f5ab13e66777272d40e11089ff3')
            .then(response => response.json())
            .then(data => {

                
            
            })

    },



    serviceWorker () {
        // Check that service workers are supported
        if ('serviceWorker' in navigator) {
            // Use the window load event to keep the page load performant
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/service-worker.js');
            });
          }
    }

}

app.serviceWorker()
app.getWeather()

  