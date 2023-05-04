function GetInfo() {
    const cityName = document.getElementById("cityName");
    const newName = document.getElementById("cityInput").value;
    cityName.innerHTML = `--${newName}--`;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newName}&appid=20516ee7fdcc8a804bdcda9f63d8d30a`)
    .then(response => response.json())
    .then(data => {
        const {list} = data;
        for(let i = 0; i < 5; i++){
            document.getElementById(`day${i+1}Min`).innerHTML = `Min: ${(list[i].main.temp_min - 273.15).toFixed(1)}°`;
            document.getElementById(`day${i+1}Max`).innerHTML = `Max: ${(list[i].main.temp_max - 273.15).toFixed(2)}°`;
            document.getElementById(`img${i+1}`).src = `http://openweathermap.org/img/wn/${list[i].weather[0].icon}.png`;
        }
    })
    .catch(err => alert("Something Went Wrong: Try Checking Your Internet Coneciton"));
}

function DefaultScreen(){
    document.getElementById("cityInput").value = "melbourne";
    GetInfo();
}

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const d = new Date();
for(let i = 0; i < 5; i++){
    const dayIndex = (i + d.getDay()) % 7;
    document.getElementById(`day${i+1}`).innerHTML = weekdays[dayIndex];
}