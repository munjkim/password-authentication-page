let usedDeleteKey = false;
let correctCount = 0;
let intervalId = null;
let startTime = null;
let previousInputTime = null;
let startButtonActivated = false;
let logData = []; // Array to store log data

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

    const currentTime = Date.now();

    if (enteredPassword === correctPassword && !usedDeleteKey) {
        resultMessage.textContent = 'Password is correct.';
        resultMessage.style.color = 'green';
        correctCount++;
        correctCountElement.textContent = correctCount;

        // Record the timestamp when the correct password is entered without using 'Delete'.!!
        if (startButtonActivated) {
            // Just for debugging
            // console.log(`Previous input time: ${previousInputTime}, Current input time: ${currentTime}`);

            logData.push({ startPoint: previousInputTime, endPoint: currentTime });
        }
    } else if (enteredPassword === correctPassword && usedDeleteKey) {
        resultMessage.textContent = "Correct but you used 'Delete'.";
        resultMessage.style.color = 'orange';
    } else {
        resultMessage.textContent = 'Password is wrong.';
        resultMessage.style.color = 'red';
    }

    passwordInput.disabled = true;
    passwordInput.classList.add('input-disabled');

    setTimeout(() => {
        resultMessage.textContent = '';
        passwordInput.disabled = false;
        passwordInput.classList.remove('input-disabled');
        passwordInput.focus();
        previousInputTime = currentTime; // Update previous input time
    }, 1000);

    document.getElementById('password').value = '';
    usedDeleteKey = false;
});

document.getElementById('startButton').addEventListener('click', function() {
    correctCount = 0;
    document.getElementById('correctCount').textContent = correctCount;
    
    if (intervalId) {
        clearInterval(intervalId);
    }

    startTime = Date.now();

    previousInputTime = startTime; // Initialize previousInputTime with start time

    intervalId = setInterval(() => {
        elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById('elapsedTime').textContent = `Elapsed time: ${elapsedTime}s`;
    }, 1000);

    document.getElementById('startButton').disabled = true;
    document.getElementById('endButton').disabled = false;

    document.querySelector('.user-info-container').classList.add('sky-blue-background');
    document.querySelector('.count-container').classList.add('sky-blue-background');

    startButtonActivated = true; // Set to true when start button is activated
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

    document.getElementById('modalUserName').textContent = `User Name: ${userName}`;
    document.getElementById('modalUserId').textContent = `User ID: ${userId}`;
    document.getElementById('modalElapsedTime').textContent = `Elapsed Time: ${elapsedTime}s`;
    document.getElementById('modalCorrectAttempts').textContent = `Correct Attempts: ${correctAttempts}`;
    document.getElementById('finishModal').style.display = 'block';

    document.getElementById('finishButton').addEventListener('click', function() {
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');

        // Save log data to CSV and download
        saveLogDataToCSV(userId, userName, correctAttempts);

        window.location.href = 'id_screen.html';
    });

    elapsedTime = 0;
    correctCount = 0;
    startButtonActivated = false; // Set to false when end button is clicked
});

function saveLogDataToCSV(userId, userName, correctAttempts) {
    const date = new Date();
    const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
    const fileName = `${userId}_${userName}_${dateString}_${correctAttempts}.csv`;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "startPoint,endPoint\n";

    logData.forEach(entry => {
        csvContent += `${entry.startPoint},${entry.endPoint}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
}

function updateCurrentDateTime() {
    const now = new Date();
    const kstOffset = 9 * 60;
    const kstDate = new Date(now.getTime() + (kstOffset * 60 * 1000));
    const formattedDateTime = kstDate.toISOString().replace('T', ' ').split('.')[0];
    document.getElementById('currentDateTime').textContent = formattedDateTime;
}

setInterval(updateCurrentDateTime, 1000);
updateCurrentDateTime();