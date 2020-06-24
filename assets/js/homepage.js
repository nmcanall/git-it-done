// Global variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

// API function to fetch data for a particular user from GitHub
var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
}

// Handler for form submit
var formSubmitHandler = function(event) {
    event.preventDefault();
    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else {
        alert("You must submit a username.");
    }
}

// Listener for username submit button
userFormEl.addEventListener("submit", formSubmitHandler);