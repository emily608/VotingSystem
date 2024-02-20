class Poll {
    constructor(root, title) {
        this.root = root;
        this.selected = sessionStorage.getItem("poll-selected");
        this.endpoint = "http://localhost:3000/poll";

        this.root.insertAdjacentHTML("afterbegin", `
            <div class="poll__title">${ title }</div>
            <div class="poll__options"></div>
            <button class="submit-btn">Submit</button>
        `);

        this.optionsContainer = this.root.querySelector(".poll__options");
        this.submitButton = this.root.querySelector(".submit-btn");
        
        this._refresh();
        this.submitButton.addEventListener("click", this._handleSubmit.bind(this));
    }

    async _refresh() {
        const response = await fetch(this.endpoint);
        const data = await response.json();

        this.optionsContainer.innerHTML = "";

        for (const option of data) {
            const optionElement = document.createElement("div");
            optionElement.classList.add("poll__option");
            optionElement.textContent = option.label;
            optionElement.addEventListener("click", this._handleOptionClick.bind(this, optionElement));
            if (option.label === this.selected) {
                optionElement.classList.add("poll__option--selected");
            }
            this.optionsContainer.appendChild(optionElement);
        }
    }

    _handleOptionClick(selectedOption) {
        const allOptions = this.root.querySelectorAll(".poll__option");
        allOptions.forEach(option => {
            option.classList.remove("poll__option--selected");
        });
        selectedOption.classList.add("poll__option--selected");
    }

    _handleSubmit() {
        const selectedOption = this.root.querySelector(".poll__option--selected");
        if (selectedOption) {
            fetch(this.endpoint, {
                method: "post",
                body: `add=${selectedOption.textContent}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(() => {
                sessionStorage.setItem("poll-selected", selectedOption.textContent);
                window.location.href = "results.html"; // Redirect to results.html
            });
        } else {
            alert("Please select an option before submitting.");
        }
    }
}

const p = new Poll(
    document.querySelector(".poll"),
    "Who will win The US Open?"
);
