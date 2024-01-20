// Retrieve GitHub repos from API
fetch("https://api.github.com/users/Dylan-Watts4/repos")
    .then(response => response.json())
    .then(data => {
        // data => array of repos
        data.forEach(repo => {
            // Make a div for each repo
            let ref = document.createElement("a");
            let div = document.createElement("div");
            let textDiv = document.createElement("div");
            let buttonDiv = document.createElement("div");
            // Set the text of the div to the repo name
            ref.innerHTML = repo.name;
            ref.className = "list-group-item list-group-item-action text-truncate";
            ref.style = "min-height: 50px;"
            ref.id = "list-" + repo.name + "-list";
            ref.setAttribute("data-toggle", "list");
            ref.setAttribute("href", "#list-" + repo.name);
            ref.setAttribute("role", "tab");
            ref.setAttribute("aria-controls", repo.name);
            // Make content div
            div.className = "tab-pane fade";
            div.id = "list-" + repo.name;
            div.setAttribute("role", "tabpanel");
            div.setAttribute("aria-labelledby", "list-" + repo.name + "-list");
            // Add the repo description
            textDiv.innerHTML = repo.description;
            textDiv.style = "margin-bottom: 10px;";
            // Add the href button
            let button = document.createElement("button");
            button.type = "button";
            button.className = "btn btn-primary";
            button.innerHTML = "View Repo";
            button.style = "margin-top: 10px;";
            button.onclick = function() {
                window.open(repo.html_url, "_blank");
            }
            // Add text and button to div
            div.appendChild(textDiv);
            div.appendChild(button);
            // Add the div to the document
            document.getElementById("list-tab").appendChild(ref);
            document.getElementById("nav-tabContent").appendChild(div);
        })
    }).catch(error => console.error("Error: ", error));