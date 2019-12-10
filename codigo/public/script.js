const localhost = 'http://localhost:3000/';
function login(){
    var url = localhost.concat('login')
    var data = {};
    data.username = document.getElementById("username").value;
    data.password = document.getElementById("password").value;
    var init = { method: 'POST',
                 headers: {'Content-type' : 'application/json'},
                 credentials: 'include',
                 mode: 'cors',
                 body: JSON.stringify(data)}
    fetch(url, init)
    .then(response => response.json())
    .then(res => window.location.href = localhost);
}

function signUp(){
    var url = localhost.concat('register');
    var data = {};
    data.username = document.getElementById("username").value;
    data.password = document.getElementById("password").value;
    var init = { method: 'POST',
                 headers: {'Content-type' : 'application/json'},
                 mode: 'cors',
                 body: JSON.stringify(data)}
    fetch(url, init)
    .then(response => response.json())
    .then(res => window.location.href = localhost);
}

function sell(id, salary){
    var url = localhost.concat('players/'+ id);
    var data = {};
    data.id = id;
    data.salary = salary;
    var init = { method: 'PUT',
                 headers: {'Content-type' : 'application/json'},
                 mode: 'cors',
                 body: JSON.stringify(data)}
    fetch(url, init)
    .then(response => response.json())
    .then(res => window.location.href = localhost);
}

function buy(){
    var url = localhost.concat('players/buy');
    var data = {};
    data.playerid = document.getElementById("playerid").value;
    data.teamid = document.getElementById("teamid").value
    var init = { method: 'PUT',
                 headers: {'Content-type' : 'application/json'},
                 mode: 'cors',
                 body: JSON.stringify(data)}
    fetch(url, init)
    .then(response => response.json())
    .then(res => window.location.href = localhost);
}