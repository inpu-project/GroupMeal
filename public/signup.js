function check_requirements() {
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const passwrd_confirm = document.getElementById('passwrd_confirm').value;
    
    // check nickname
    const nickname_error = document.getElementById('nickname_error');
    nickname_error.style.display = 'none';
    if(!possible_nickname(nickname)) {
        nickname_error.style.display = 'block';
        return;
    }

    // check email
    const email_error = document.getElementById('email_error');
    if(!possible_email(email)) {
        email_error.style.display = 'block';
        return;
    }

    // 아직 미완성
}