// Global variables
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term")

// API function to fetch data for a particular user from GitHub
var getUserRepos = function(user) {
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    });
}

// Helper method to display the repos of a given username
var displayRepos = function(repos, searchTerm) {
    // Clear old data
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // Loop through all repos to pull appropriate data
    for(var i = 0; i < repos.length; i++) {

        // Create a container for the current repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // Repo name portion of the list item
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        // Create a span element to hold the repo's name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        // Add repo name to the repo element
        repoEl.appendChild(titleEl);

        // Number of issues portion of the list item
        var numIssues = repos[i].open_issues_count;
        // Create a span element to hold status icon and number of issues
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        // Check if current repo has open issues
        if(numIssues > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + numIssues + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
        }
        repoEl.appendChild(statusEl);

        // Add both elements to the repo container element
        repoContainerEl.appendChild(repoEl);
    }
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