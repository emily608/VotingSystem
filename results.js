class Results {
    constructor(data) {
        this.data = this.convertObjectToArray(data);
        this.totalVotes = this.calculateTotalVotes();
        this.sortResults();
    }

    convertObjectToArray(data) {
        return Object.entries(data).map(([label, votes]) => ({ label, votes }));
    }

    calculateTotalVotes() {
        return this.data.reduce((total, option) => total + option.votes, 0);
    }

    sortResults() {
        this.data.sort((a, b) => b.votes - a.votes);
    }

    renderTemplate() {
        const template = document.getElementById('template');
        template.innerHTML = '';
        this.data.forEach(option => {
            const percentage = Math.trunc((option.votes / this.totalVotes) * 100);
            template.innerHTML += `
                <div class="poll__option ${this.selected == option.label ? "poll__option--selected" : ""}">
                    <div class="poll__option-fill"></div>
                    <div class="poll__option-info">
                        <span class="poll__label">${option.label}</span>
                        <span class="poll__percentage">${percentage}%</span>
                    </div>
                </div>
            `;
        });
    }
}

// Fetch JSON data and process it
fetch('../server/data.json')
    .then(response => response.json())
    .then(data => {
        const results = new Results(data);
        results.renderTemplate();
    })
    .catch(error => console.error('Error fetching data:', error));
