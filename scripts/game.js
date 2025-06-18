// Simple betting form logic
document.getElementById('betForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedTeam = document.querySelector('input[name="team"]:checked').value;
    document.getElementById('result').textContent = `You have selected: ${selectedTeam}`;
});
