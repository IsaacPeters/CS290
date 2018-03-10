document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons(){
    document.getElementById('submitButton').addEventListener('click', function(event){

        var req = new XMLHttpRequest();
        console.log("test");
        req.open('GET', 'http://localhost:6875/', false);
        
        console.log("test");
        req.send(null);
        var response = JSON.parse(req.responseText);
        console.log(response);
        event.preventDefault();
    })
}