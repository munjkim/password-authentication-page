let usedDeleteKey = false;
let correctCount = 0;
let intervalId = null;
let startTime = null;

document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        usedDeleteKey = true;
    }
});

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correctPassword = 'Dgist2024!';
    const enteredPassword = document.getElementById('password').value;
    const resultMessage = document.getElementById('resultMessage');
    const correctCountElement = document.getElementById('correctCount');
    const passwordInput = document.getElementById('password');

    if (enteredPassword === correctPassword && !usedDeleteKey) {
        resultMessage.textContent = 'Password is correct.';
        resultMessage.style.color = 'green';
        correctCount++;
        correctCountElement.textContent = correctCount;
    } else if (enteredPassword === correctPassword && usedDeleteKey) {
        resultMessage.textContent = "Correct but you used 'Delete'.";
        resultMessage.style.color = 'orange';
    } else {
        resultMessage.textContent = 'Password is wrong.';
        resultMessage.style.color = 'red';
    }

    
    passwordInput.disabled = true;
    passwordInput.classList.add('input-disabled');  // Add the red class

    setTimeout(() => {
        resultMessage.textContent = '';
        passwordInput.disabled = false;
        passwordInput.classList.remove('input-disabled');  // Remove the red class
        passwordInput.focus();
    }, 1000);

    document.getElementById('password').value = '';
    usedDeleteKey = false;
});

document.getElementById('startButton').addEventListener('click', function() {
    // passwordInput.focus();
    correctCount = 0;
    document.getElementById('correctCount').textContent = correctCount;
    
    if (intervalId) {
        clearInterval(intervalId);
    }
    startTime = Date.now();
    intervalId = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('elapsedTime').textContent = `Elapsed time: ${elapsedTime}s`;
    }, 1000);

    document.getElementById('startButton').disabled = true;
    document.getElementById('endButton').disabled = false;

    // Apply the sky blue background color
    document.querySelector('.user-info-container').classList.add('sky-blue-background');
    document.querySelector('.count-container').classList.add('sky-blue-background');
});

document.getElementById('endButton').addEventListener('click', function() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    document.getElementById('elapsedTime').textContent = 'Elapsed time: --s';
    document.getElementById('correctCount').textContent = '--';
    document.getElementById('startButton').disabled = false;
    document.getElementById('endButton').disabled = true;

    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const correctAttempts = correctCount;

    // alert(`User Information:\n\nUser Name: ${userName}\nUser ID: ${userId}\nElapsed Time: ${elapsedTime}s\nCorrect Attempts: ${correctAttempts}`);
    // Display the modal with user information
    document.getElementById('modalUserName').textContent = `User Name: ${userName}`;
    document.getElementById('modalUserId').textContent = `User ID: ${userId}`;
    document.getElementById('modalElapsedTime').textContent = `Elapsed Time: ${elapsedTime}s`;
    document.getElementById('modalCorrectAttempts').textContent = `Correct Attempts: ${correctAttempts}`;
    document.getElementById('finishModal').style.display = 'block';

    document.getElementById('finishButton').addEventListener('click', function() {
        // Reset all data and redirect to id_screen
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        window.location.href = 'id_screen.html';
    });

    elapsedTime = 0;
    correctCount = 0;

});

function updateCurrentDateTime() {
    const now = new Date();
    const kstOffset = 9 * 60;
    const kstDate = new Date(now.getTime() + (kstOffset * 60 * 1000));
    const formattedDateTime = kstDate.toISOString().replace('T', ' ').split('.')[0];
    document.getElementById('currentDateTime').textContent = formattedDateTime;
}

setInterval(updateCurrentDateTime, 1000);
updateCurrentDateTime();