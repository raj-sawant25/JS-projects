document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input")
    const getWeatherBtn = document.getElementById("get-weather-btn")
    const weatherInfo = document.getElementById("weather-info")
    const cityName = document.getElementById("city-name")
    const cityTemp = document.getElementById("temperature")
    const cityDes = document.getElementById("description")
    const errorM = document.getElementById("error-message")

    const API_KEY = "ff359def5bb4d04f3ab6df825ecdb433"

    getWeatherBtn.addEventListener('click', async () => {
            const city = cityInput.value.trim()
            if(!city) return;

            try{
                const weatherdata = await getWeatherdata(city)
                displayWeatherdata(weatherdata)
            }catch(error){
                showError()
            }
    })

    async function getWeatherdata(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url)

        if(!response.ok){
            throw new Error("City not found")
        }

        const data = await response.json()
        return data
        
    }


    function displayWeatherdata(city){

        const {name, main, weather} = city
        cityName.textContent = name
        cityTemp.textContent = `Temperature : ${main.temp}`
        cityDes.textContent = `Weather : ${weather[0].description}`

        weatherInfo.classList.remove('hidden')
        errorM.classList.add('hidden')
    }

    function showError(){
        weatherInfo.classList.add('hidden')
        errorM.classList.remove('hidden')
    }
})