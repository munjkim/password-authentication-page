document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const correctPassword = '12345'; // 여기에 원하는 비밀번호를 설정하세요.
    const enteredPassword = document.getElementById('password').value;
    const resultMessage = document.getElementById('resultMessage');

    if (enteredPassword === correctPassword) {
        resultMessage.textContent = 'Password is correct!';
        resultMessage.style.color = 'green';
        setTimeout(() => {
            resultMessage.textContent = '';
        }, 1000); // 1초 후 메시지 지우기
    } else {
        resultMessage.textContent = 'Password is incorrect!';
        resultMessage.style.color = 'red';
        setTimeout(() => {
            resultMessage.textContent = '';
        }, 1000); // 1초 후 메시지 지우기
    }
});