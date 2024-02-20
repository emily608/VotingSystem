# Voting System

Voting system that asks a user who they think will win the US Open.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your machine.
- Visual Studio Code (or any preferred code editor).

### Installation

1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/emily608/VotingSystem.git

2. Navigate to the project directory

3. Install dependencies using npm
   npm install

### Usage
Open project directory in Visual Studio Code

Open HTML file using Live Server extension

Start the project
npm start

Access the project in your web browser at http://localhost:3000

### Improvements
With more time I would have implemented the following:
A span of the percentage of total votes. The results do not visually show the percentage span of each of the options total votes.
Improve the CSS to align the results centrally.
Each of the results reacts to the mouse hovering over it, potentially wouldn't have this as they are no longer able to click on the options.

### Testing
I used Insomnia to test the GET and POST of the api.
I tested the user interface by manually exploring each option.

### Security Risks
The poll could be vulnerable to vote manipulation. 
No authentication mechanism so unauthorised users could access the poll and tamper with results.
