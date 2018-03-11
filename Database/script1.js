document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    document.getElementById('submitButton').addEventListener('click', function(event){

        var req = new XMLHttpRequest();
        req.open('GET', 'http://localhost:6875/', true);

        req.addEventListener('load', function(){
            alert("response received from the server");
            var response = JSON.parse(req.responseText);
            console.log(response);
        });
        
        req.send(null);
        event.preventDefault();
    })
}