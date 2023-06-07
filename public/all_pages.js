function menu_onclick() {
    const menu_btn = document.getElementById("menu_list");
    if(menu_btn.style.display == "none") menu_btn.style.display = "block";
    else menu_btn.style.display = "none";
}
function user_onclick() {
    const user_box = document.getElementById("user_box");
    if(user_box.style.display == "none") user_box.style.display = "block";
    else user_box.style.display = "none";
}
function logout() {
    location.href = 'login.html';
}