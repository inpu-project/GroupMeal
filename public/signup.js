function onclick_keyword(event) {
    event.classList.toggle("selected_keyword_pink");
    console.log(event.childNodes[1]);
    event.childNodes[1].value = event.classList.contains("selected_keyword_pink") ? "true" : "false";
}

// let nickname, email, gender, age, password, password_confirm;
// let nickname_error, email_error, password_error, password_confirm_error, personalities_error;

// window.onload = () => {
//     init_settings();
// }

// function init_settings() {
//     nickname = document.getElementById('nickname');
//     email = document.getElementById('email');
//     gender = document.getElementById('gender');
//     age = document.getElementById('age');
//     password = document.getElementById('password');
//     password_confirm = document.getElementById('password_confirm');

//     nickname_error = document.getElementById('nickname_error');
//     email_error = document.getElementById('email_error');
//     password_error = document.getElementById('password_error');
//     password_confirm_error = document.getElementById('password_confirm_error');
//     personalities_error = document.getElementById('personalities_error');
// }

// function possible_nickname(nickname) {
//     var url = 'http://localhost:8001/auth/check_nickname';
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("POST", url);
//     xhttp.setRequestHeader("Content-Type", "application/json");
//     xhttp.send(JSON.stringify({nickname: nickname}));
// }

// function check_requirements() {

//     // check nickname
//     nickname_error.style.display = 'none';
//     if(!possible_nickname(nickname.value)) {
//         nickname_error.value = '사용할 수 없는 닉네임입니다';
//         nickname_error.style.display = 'block';
//         return;
//     }
//     else {
//         nickname_error.value = '사용가능한 닉네임입니다';
//     }

//     // check password
//     password_error.style.display = 'none';
//     if(password.value != password_confirm.value) {
//         password_error.value = '비밀번호가 일치하지 않습니다';
//         password_error.style.display = 'block';
//         return;
//     }

//     // check personality
//     const personalities = document.querySelectorAll('li');
//     let selected_personalities = [];
//     let selected_cnt = 0;
//     for(let i = 0; i < personalities.length; i++) {
//         if(personalities[i].classList.contains('selected_keyword_red')) {
//             selected_personalities.push(1);
//             selected_cnt++;
//         }
//         else selected_personalities.push(0);
//     }
//     const personalities_error = document.getElementById('personalities_error');
//     personalities_error.style.display = 'none';
//     if(selected_cnt === 0) {
//         personalities_error.value = '성격 키워드를 골라주세요';
//         personalities_error.style.display = 'block';
//         return;
//     }
//     else if(selected_cnt > 2) {
//         personalities_error.value = '성격 키워드를 최대 2개 골라주세요';
//         personalities_error.style.display = 'block';
//         return;
//     }
// }