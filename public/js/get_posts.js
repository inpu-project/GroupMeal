const age10_option = document.getElementById("age10_option");
const age20_option = document.getElementById("age20_option");
const age30_option = document.getElementById("age30_option");
const age40_option = document.getElementById("age40_option");
const age50_option = document.getElementById("age50_option");

const male_option = document.getElementById("male_option");
const female_option = document.getElementById("female_option");

function onclick_age_option(event) {
    event.classList.toggle('selected_age');
    update_posts();
}
function onclick_male_option(event) {
    event.classList.toggle('selected_male');
    update_posts();
}
function onclick_female_option(event) {
    event.classList.toggle('selected_female');
    update_posts();
}

function update_posts() {
    let age10_option_selected = age10_option.classList.contains('selected_age');
    let age20_option_selected = age20_option.classList.contains('selected_age');
    let age30_option_selected = age30_option.classList.contains('selected_age');
    let age40_option_selected = age40_option.classList.contains('selected_age');
    let age50_option_selected = age50_option.classList.contains('selected_age');
    let male_option_selected = male_option.classList.contains('selected_male');
    let female_option_selected = female_option.classList.contains('selected_female');
    location.href = `/mealmate?age10=${age10_option_selected}&age20=${age20_option_selected}&age30=${age30_option_selected}&age40=${age40_option_selected}&age50=${age50_option_selected}&male=${male_option_selected}&female=${female_option_selected}`;
}