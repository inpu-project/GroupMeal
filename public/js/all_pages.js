function menu_onclick() {
    const menu_btn = document.getElementById("menu");
    if(menu_btn.style.display == "none") menu_btn.style.display = "flex";
    else menu_btn.style.display = "none";
}
function user_onclick() {
    const user_box = document.getElementById("user_box");
    if(user_box.style.display == "none") user_box.style.display = "grid";
    else user_box.style.display = "none";
}
function request_onclick(connectionId) {
    window.location.href = `/mealmate_accept?connectionId=${connectionId}`;
}
function request_again_onclick(connectionId) {
    window.location.href = `/matching_dontwant_cancel?connectionId=${connectionId}`;
}
function logout() {
    location.href = '/auth/logout';
}
function request_final_access_onclick(connectionId, connectionType) {
    if(connectionType === "deliver") {
        window.location.href = `/mealmate_order_success?connectionId=${connectionId}`;
    }
    if(connectionType === "meeting") {
        window.location.href = `/mealmate_eat_success?connectionId=${connectionId}`;
    }
}
function request_finish_matching(connectionId, connectionType) {
    if(connectionType === "deliver") {
        window.location.href = `/review_order?connectionId=${connectionId}`;
    }
    if(connectionType === "meeting") {
        window.location.href = `/review_eat?connectionId=${connectionId}`;
    }
}