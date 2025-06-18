// Betting form logic
const form = document.getElementById('betForm');
const resultDiv = document.getElementById('result');
const historyList = document.getElementById('historyList');

let bettingHistory = [];

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedTeam = document.querySelector('input[name="team"]:checked').value;

    // Show result with animation
    resultDiv.textContent = `You have selected: ${selectedTeam}`;
    resultDiv.classList.add('show');

    // Add to history
    bettingHistory.push(selectedTeam);
    updateHistory();
});

function updateHistory() {
    historyList.innerHTML = '';
    bettingHistory.slice().reverse().forEach((team, index) => {
        const li = document.createElement('li');
        li.textContent = `Bet ${bettingHistory.length - index}: ${team}`;
        historyList.appendChild(li);
    });
}
