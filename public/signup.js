function possible_nickname(nickname) {
    var url = 'http://localhost:8001/auth/check_nickname';
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({nickname: nickname}));
}

function check_requirements() {
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const password_confirm = document.getElementById('password_confirm').value;

    // check nickname
    const nickname_error = document.getElementById('nickname_error');
    nickname_error.style.display = 'none';
    if(!possible_nickname(nickname)) {
        nickname_error.value = '사용할 수 없는 닉네임입니다';
        nickname_error.style.display = 'block';
        return;
    }
    else {
        nickname_error.value = '사용가능한 닉네임입니다';
    }

    // check password
    const password_error = document.getElementById('password_error');
    password_error.style.display = 'none';
    if(password != password_confirm) {
        password_error.value = '비밀번호가 일치하지 않습니다';
        password_error.style.display = 'block';
        return;
    }

    // check personality
    const personalities = document.querySelectorAll('personality');
    let selected_personalities = [];
    let selected_cnt = 0;
    for(let i = 0; i < personalities.length; i++) {
        if(personalities[i].classList.contains('selected')) {
            selected_personalities.push(1);
            selected_cnt++;
        }
        else selected_personalities.push(0);
    }
    const personalities_error = document.getElementById('personalities_error');
    personalities_error.style.display = 'none';
    if(selected_cnt === 0) {
        personalities_error.value = '성격 키워드를 골라주세요';
        personalities_error.style.display = 'block';
        return;
    }
    else if(selected_cnt > 2) {
        personalities_error.value = '성격 키워드를 최대 2개 골라주세요';
        personalities_error.style.display = 'block';
        return;
    }
}