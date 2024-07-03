let usedDeleteKey = false;
let correctCount = 0;
let intervalId = null;
let startTime = null;
let previousInputTime = null;
let startButtonActivated = false;
let logData = []; // Array to store log data
let keyEventData = [];

const keycodeToHidUsage = {
    8: 42, // Backspace 
    9: 43, // Tab
    13: 40, // Enter
    // 13: 88, // Keypad Enter
    16: 225, // L-Shift
    17: 224, // L-Ctrl
    18: 226, // L-Alt
    19: 72, // Pause
    20: 57, // CapsLock
    21: 230, //R-Alt
    25: 228, //R-Ctrl
    27: 41, // Escape
    32: 44, // Space
    33: 75, // PgUp
    34: 78, // PgDn
    35: 77, // End
    36: 74, // Home
    37: 80, // Left
    38: 82, // Up
    39: 79, // Right
    40: 81, // Down
    45: 73, // Insert
    46: 76, // Delete
    48: 39, // 0
    49: 30, // 1
    50: 31, // 2
    51: 32, // 3
    52: 33, // 4
    53: 34, // 5
    54: 35, // 6
    55: 36, // 7
    56: 37, // 8
    57: 38, // 9
    65: 4, // a
    66: 5, // b
    67: 6, // c
    68: 7, // d
    69: 8, // e
    70: 9, // f
    71: 10, // g
    72: 11, // h
    73: 12, // i
    74: 13, // j
    75: 14, // k
    76: 15, // l
    77: 16, // m
    78: 17, // n
    79: 18, // o
    80: 19, // p
    81: 20, // q
    82: 21, // r
    83: 22, // s
    84: 23, // t
    85: 24, // u
    86: 25, // v
    87: 26, // w
    88: 27, // x
    89: 28, // y
    90: 29, // z
    91: 227, //L-GUI
    92: 231, //R-GUI
    96: 98, // 0
    97: 89, // 1
    98: 90, // 2
    99: 91, // 3
    100: 92, // 4
    101: 93, // 5
    102: 94, // 6
    103: 95, // 7
    104: 96, // 8
    105: 97, // 9
    106: 85, // *
    107: 87, // +
    109: 86, // -
    110: 99, // .
    111: 84, // /
    112: 58, // F1
    113: 59, // F2
    114: 60, // F3
    115: 61, // F4
    116: 62, // F5
    117: 63, // F6
    118: 64, // F7
    119: 65, // F8
    120: 66, // F9
    121: 67, // F10
    122: 68, // F11
    123: 69, // F12
    144: 83, // NumLock
    145: 1032, // ScrLk
    186: 51, // ;
    187: 46, // =
    188: 54, // ,
    189: 45, // -
    190: 55, // .
    191: 56, // /
    192: 53, // `
    219: 47, // [
    220: 49, // \
    221: 48, // ]
    222: 52, // '
};

// Function to convert key code to HID usage code
function convertKeyCodeToHIDUsage(keyCode) {
    return keycodeToHidUsage[keyCode] || null;
}

document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        usedDeleteKey = true;
    }

    // Log keydown event data
    const timestamp = Date.now();
    // const hidCode = convertKeyCodeToHIDUsage(event.keyCode);

    keyEventData.push({keyEvent: "keyDown", keyCode: event.keyCode, timeStamp: timestamp });
});

document.getElementById('password').addEventListener('keyup', function(event) {
    // Log keyup event data
    const timestamp = Date.now();
    // const hidCode = convertKeyCodeToHIDUsage(event.keyCode);

    keyEventData.push({keyEvent: "keyUp", keyCode: event.keyCode, timeStamp: timestamp });
});

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correctPassword = 'dgistAK9365!';
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

            logData.push({keyEvent:"Start", keyCode:null, timeStamp:previousInputTime});
            
            console.log(keyEventData);
            keyEventData.forEach(entry => {
                if(entry.timeStamp >= previousInputTime && entry.timeStamp <= currentTime){
                    logData.push(entry);
                }
            });

            logData.push({keyEvent:"End", keyCode:null, timeStamp:currentTime});
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
        keyEventData = [];
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
    keyEventData = [];

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
    keyEventData = [];
    logData = [];
});

function saveLogDataToCSV(userId, userName, correctAttempts) {
    const now = new Date();
    const kstOffset = 9 * 60;
    const date = new Date(now.getTime() + (kstOffset * 60 * 1000));
    
    const dateString = date.toISOString().split('T')[0].replace(/-/g, '');
    const fileName = `${userId}_${userName}_${dateString}_${correctAttempts}.csv`;

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "keyEvent,keyCode,timeStamp\n";

    logData.forEach(entry => {
        csvContent += `${entry.keyEvent},${entry.keyCode},${entry.timeStamp}\n`;
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
