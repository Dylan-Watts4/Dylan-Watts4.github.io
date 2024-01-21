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
        languagesArray = Object.entries(allLanguages);
        languagesArray.sort((a, b) => b[1] - a[1]);
        const top5Languages = languagesArray.slice(0, 5);
        const top5LanguagesObject = Object.fromEntries(top5Languages);
        const ctx = document.getElementById('code-stats').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(top5LanguagesObject),
                datasets: [{
                    data: Object.values(top5LanguagesObject),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', // Red
                        'rgba(54, 162, 235, 0.2)', // Blue
                        'rgba(255, 206, 86, 0.2)', // Yellow
                        'rgba(75, 192, 192, 0.2)', // Green
                        'rgba(153, 102, 255, 0.2)', // Purple
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'rgb(211, 206, 206)'
                        }
                    }
                },
                title: {
                    display: false,
                    text: 'Programming Languages Used'
                }
            }
        });
    });