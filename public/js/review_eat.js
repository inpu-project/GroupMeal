const personality_yes = document.getElementById('personality_yes');
const personality_no = document.getElementById('personality_no');

const ontime = document.getElementById('ontime');
const fun = document.getElementById('fun');
const communication = document.getElementById('communication');
const comfortable = document.getElementById('comfortable');
const nice = document.getElementById('nice');

personality_yes.addEventListener('click', () => {
    if(!personality_yes.classList.contains('selected_mint_color')) {
        personality_yes.classList.toggle('selected_mint_color');
        personality_no.classList.toggle('selected_mint_color');
    }
    nice.value = personality_yes.classList.contains('selected_mint');
});

personality_no.addEventListener('click', () => {
    if(!personality_no.classList.contains('selected_mint_color')) {
        personality_yes.classList.toggle('selected_mint_color');
        personality_no.classList.toggle('selected_mint_color');
    }
    nice.value = personality_yes.classList.contains('selected_mint');
});

function onclick_keyword(event, type) {
    event.classList.toggle('selected_mint_color');
    if(type === 'ontime') ontime.value = event.classList.contains('selected_mint_color');
    else if(type === 'fun') fun.value = event.classList.contains('selected_mint_color');
    else if(type === 'communication') communication.value = event.classList.contains('selected_mint_color');
    else if(type === 'comfortable') comfortable.value = event.classList.contains('selected_mint_color');
    else if(type === 'nice') nice.value = event.classList.contains('selected_mint_color');
}