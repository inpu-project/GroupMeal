const ontime = document.getElementById('ontime');

function onclick_keyword(event) {
    event.classList.toggle('selected_mint_color');
    ontime.value = event.classList.contains('selected_mint_color');
}