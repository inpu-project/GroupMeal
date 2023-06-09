const submit_btn = document.getElementById('submit_btn');
const password = document.getElementById('password');
const password_confirm = document.getElementById('password_confirm');
password_confirm.onkeyup = function() {
    update_btn_disabled();
};

function onclick_keyword(event) {
    event.classList.toggle("selected_keyword_pink");
    console.log(event.childNodes[1]);
    event.childNodes[1].value = event.classList.contains("selected_keyword_pink") ? "true" : "false";
    update_btn_disabled();
}
function update_btn_disabled() {
    console.log(password.value, password_confirm.value);
    submit_btn.disabled = true;
    if(password.value.trim() == 0 || password_confirm.value.trim() == 0) return;
    if(password.value != password_confirm.value) return;
    console.log("password is the same");
    const personalities = document.querySelectorAll('li');
    let keyword_cnt = 0;
    for(let i = 0; i < personalities.length; i++) if(personalities[i].classList.contains('selected_keyword_pink')) keyword_cnt++;
    if(keyword_cnt == 0 || keyword_cnt > 2) return;
    console.log("keyword_cnt is fine");
    submit_btn.disabled = false;
}