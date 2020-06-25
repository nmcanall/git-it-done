var issuesContainerEl = document.querySelector("#issues-container");

// API function to fetch data for a particular user from GitHub
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {

        // Check if user exists
        if(response.ok) {
            response.json().then(function(data) {
                displayIssues(data);
            });
        }

        // If user does not exist, display an error message
        else {
            alert("Error: " + response.statusText);
        }
    })

    // Check if there is a network connection error with GitHub
    .catch(function(error) {
        alert("Unable to connect to GitHub");
    });
}

var displayIssues = function(issues) {

    // Check if there are no open issues
    if(issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
    }

    for(var i = 0; i < issues.length; i++) {

        // Create a container for the current issue
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        
        // Add title of the issue to the issueEl
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        issueEl.appendChild(titleEl);

        // Add type of issue to the issueEl
        var typeEl = document.createElement("span");
        // Check if issue is actual issue or pull request
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }
        else {
            typeEl.textContent = "(Issue)";
        }
        issueEl.appendChild(typeEl);

        // Add issueEl to issuesContainerEl
        issuesContainerEl.appendChild(issueEl);
    }
}

getRepoIssues("nmcanall/taskinator");