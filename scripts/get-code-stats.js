fetch("https://api.github.com/users/Dylan-Watts4/repos")
    .then(response => response.json())
    .then(repos => {
        const languagePromises = repos.map(repo => 
            fetch(repo.languages_url).then(response => response.json()));
            return Promise.all(languagePromises);
    })
    .then(languagesArray => {
        const allLanguages = {};
        languagesArray.forEach(languages => {
            for (const [language, bytes] of Object.entries(languages)) {
                allLanguages[language] = (allLanguages[language] || 0) + bytes;
            }
        });
        // TODO: Sort languages by bytes
        const ctx = document.getElementById('code-stats').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(allLanguages),
                datasets: [{
                    data: Object.values(allLanguages),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', // Red
                    ]
                }]
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Programming Languages Used'
                }
            }
        });
    });