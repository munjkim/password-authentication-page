document.getElementById('authForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const userId = document.getElementById('userId').value;
    const userSession = document.getElementById('userSession').value;

    // Store user details in localStorage
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
    localStorage.setItem('userSession', userSession);

    // Display confirmation modal with user details
    document.getElementById('confirmUserName').textContent = `User name: ${userName}`;
    document.getElementById('confirmUserId').textContent = `User ID: ${userId}`;
    document.getElementById('confirmUserSession').textContent = `User session: ${userSession}`;
    document.getElementById('confirmationModal').style.display = 'block';
});

document.getElementById('goButton').addEventListener('click', function() {
    // Redirect to main_screen.html
    window.location.href = 'main_screen.html';
});

document.getElementById('cancelButton').addEventListener('click', function() {
    // Hide the modal
    document.getElementById('confirmationModal').style.display = 'none';
});

// Optional: Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};