
const label = document.querySelector('span');
const button = document.querySelector('button');

async function getLastTicket() {
    const lastTicket = await fetch('/api/ticket/last').then( resp => resp.json() );

    label.innerHTML = lastTicket;
}

async function createTicket() {
    const newTicket = await fetch('/api/ticket',{
        method: 'POST'
    }).then( resp => resp.json() );

    label.innerHTML = newTicket.number;;
}

button.addEventListener('click', createTicket );

getLastTicket();