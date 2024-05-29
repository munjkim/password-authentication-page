let usedDeleteKey = false;
let correctCount = 0;

document.getElementById('password').addEventListener('keydown', function(event) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
        usedDeleteKey = true;
    }
});

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correctPassword = '12345'; // 여기에 원하는 비밀번호를 설정하세요.
    const enteredPassword = document.getElementById('password').value;
    const resultMessage = document.getElementById('resultMessage');
    const correctCountElement = document.getElementById('correctCount');

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

    setTimeout(() => {
        resultMessage.textContent = '';
    }, 1000); // 1초 후 메시지 지우기

    document.getElementById('password').value = ''; // 입력 필드 초기화
    usedDeleteKey = false; // delete 키 사용 여부 초기화
});