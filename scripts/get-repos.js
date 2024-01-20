// Retrieve GitHub repos from API
fetch("https://api.github.com/users/Dylan-Watts4/repos")
    .then(response => response.json())
    .then(data => {
        // data => array of repos
        data.forEach(repo => {
            // Create column
            let col = document.createElement("div");
            col.className = "col-12 col-sm-6 col-md-4";

            // Create card element
            let card = document.createElement("div");
            card.className = "card border-primary d-flex flex-column";
            card.style.width = "100%";
            card.style.height = "100%";

            // Create card body element
            let cardBody = document.createElement("div");
            cardBody.className = "card-body text-center d-flex flex-column";

            // Create card title element
            let cardTitle = document.createElement("h5");
            cardTitle.className = "card-title";
            cardTitle.innerText = repo.name;

            // Create card text element
            let cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.innerText = repo.description;

            // Create card link element
            let cardFooter = document.createElement("div");
            cardFooter.className = "card-footer mt-auto";
            let cardButton = document.createElement("button");
            cardButton.className = "btn btn-primary";
            cardButton.innerText = "Go to Repo";
            cardButton.onclick = () => window.open(repo.html_url);
            cardFooter.appendChild(cardButton);

            // Append elements to card body
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(cardFooter);

            // Append card body to card
            card.appendChild(cardBody);
            // Append card to col
            col.appendChild(card);
            // Append col to row
            document.getElementById("repo-cards").appendChild(col);
        })
    }).catch(error => console.error("Error: ", error));