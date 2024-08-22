const apiKey="d2df25bbd0beea36a96232522ce08809";
const apiURL="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchPlaceholder =document.querySelector('.search-bar input');
const searchButton=document.querySelector('.search-btn');

const currentDate = new Date();
const hours = currentDate.getHours();
updateBackground(hours);

let iconUpdate = document.querySelector(".temperature-img")
async function checkWeather(city)
{
    const responce = await fetch(apiURL+city+`&appid=${apiKey}`);
    var data = await responce.json();
    console.log(data);
    if(responce.status == 404)
    {
        document.querySelector(".error-msg").style.display = "block";
        document.querySelector(".location-bar").classList.add("hidden");
        document.querySelector(".temperature-main").classList.add("hidden");
        document.querySelector(".time-details").classList.add("hidden");
        document.querySelector(".right").classList.add("hidden");
    }
    else
    {
        updateDateTime();
    document.querySelector(".error-msg").style.display = "none";
    document.querySelector(".location-text").innerHTML=data.name+", "+data.sys.country;
    document.querySelector(".temperature-value").innerHTML=Math.round(data.main.temp)+"°c";
    document.querySelector(".hum-value").innerHTML=data.main.humidity +"%";
    document.querySelector(".wind-value").innerHTML=data.wind.speed+" km/h";
    document.querySelector(".feel-value").innerHTML=Math.round(data.main.feels_like)+"°c";

//TO REMOVE FROM DISPLAY NONE:

    document.querySelector(".location-bar").classList.remove("hidden");
    document.querySelector(".temperature-main").classList.remove("hidden");
    document.querySelector(".time-details").classList.remove("hidden");
    document.querySelector(".right").classList.remove("hidden");
    }
    updateWeatherIcon(data, hours);
}
setInterval(checkWeather, 60000);
searchButton.addEventListener("click",()=>{
    const city = searchPlaceholder.value.trim();
    checkWeather(city);
});
searchPlaceholder.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchPlaceholder.value.trim();
        checkWeather(city);
    }
});


function updateDateTime() {
    
    const dayOfMonth = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'short' });
    const year = currentDate.getFullYear();
    const minutes = currentDate.getMinutes();
    const dateText = `${dayOfMonth} ${month} ${year}`;
    const dayTimeText = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    document.querySelector('.date').innerHTML = dateText
    document.querySelector('.time').innerHTML = dayTimeText;
}

function updateWeatherIcon(data, hours)
{
    if((data.main.temp)<0)
    {
        iconUpdate.style.backgroundImage = "url('images/snow.png')";
    }
    else if((data.weather[0].main)=="Drizzle")
    {
        iconUpdate.style.backgroundImage = "url('images/drizzle.png')";
    }
    else if((data.weather[0].main)=="Rain")
    {
        iconUpdate.style.backgroundImage = "url('images/rain.png')";
    }
    else if((data.weather[0].main)=="Thunderstorm")
    {
        iconUpdate.style.backgroundImage = "url('images/thunderstorm.png')";
    }
    else if((data.weather[0].main)=="Clear" && (hours<5 || hours>=18))
    {
            iconUpdate.style.backgroundImage = "url('images/moon.png')";
    }
    else if((data.weather[0].main)=="Haze" || (data.weather[0].main)=="Smoke" && (hours<5 || hours>=18) )
    {
            iconUpdate.style.backgroundImage = "url('images/hazeNight.png')";
    }
    else if((data.weather[0].main)=="Clouds" && (hours<5 || hours>=18))
    {
            iconUpdate.style.backgroundImage = "url('images/cloudDay.svg')";
    }
    else if((data.weather[0].main)=="Clear")
    {
            iconUpdate.style.backgroundImage = "url('images/sun.png')";
    }
    else if((data.weather[0].main)=="Clouds")
    {
            iconUpdate.style.backgroundImage = "url('images/dayCloud.png')";
    }
    else if((data.weather[0].main)=="Haze")
    {
            iconUpdate.style.backgroundImage = "url('images/haze.png')";
    }
}

function updateBackground(hours)
{
    if (hours<5)
    {
       document.querySelector(".container").classList.add("gradient-bg");
    }
    else if (hours>=19)
    {
        document.querySelector(".container").classList.add("gradient-bg");
}
}