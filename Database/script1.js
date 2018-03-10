document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    document.getElementById('submitButton').addEventListener('click', function(event){

        var req = new XMLHttpRequest();
        req.open('GET', 'http://localhost:6875/', false);
        req.send(null);
        var response = JSON.parse(req.responseText);
        console.log(response);
        event.preventDefault();
    })
}