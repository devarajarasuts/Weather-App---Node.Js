const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = search.value;
    messageTwo.textContent = 'Loading :)';
    messageOne.textContent = '';
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then(result => {
    result.json().then(data => {
        if(data.error) {
            messageTwo.textContent = data.error;
        } else {
            messageOne.innerHTML = `<b>${data.placeName}</b>`
            messageTwo.innerHTML = `<b>${data.summary}</b> at <b>${data.temperature}</b> degree celsius at <b>${data.precipProbability} % </b> precipProbability`
        }
    })
})

});