document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    document.getElementById('weatherSubmit').addEventListener('click', function(event){
        var APIKey = "ea86a4e01bf5414b259261012c1486c9";

        var req = new XMLHttpRequest();
        var payload = {zipCode:null};
        payload.zipCode = document.getElementById('zipCode').value;
        req.open('GET', 'http://api.openweathermap.org/data/2.5/weather?zip=' + payload.zipCode + ',us&units=imperial&appid='+APIKey, false);
        req.send(null);
        var response = JSON.parse(req.responseText);
        
        document.getElementById('cityFound').textContent = response.name;
        document.getElementById('temp').textContent = response.main.temp;
        document.getElementById('windSpeed').textContent = response.wind.speed;
        event.preventDefault();
    })
    document.getElementById('postSubmit').addEventListener('click', function(event){
        var APIKey = "ea86a4e01bf5414b259261012c1486c9";

        var req = new XMLHttpRequest();
        var payload = {dataToSend:null};
        payload.dataToSend = document.getElementById('output').value;
        req.open('POST', 'http://httpbin.org/post', false);
        req.send(JSON.stringify(payload.dataToSend));
        var response = JSON.parse(req.responseText);
        console.log(response);
        
        document.getElementById('postData').textContent = response.data;
        event.preventDefault();
    })
}