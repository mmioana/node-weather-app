console.log(`JS file loaded`);

fetchForecast = (address = `timisoara`) => {

    const [firstMessage, secondMessage, ...rest] = document.querySelectorAll(`form ~ p`);
    firstMessage.textContent = `Loading...`;
    secondMessage.textContent = ``;

    fetch(`/weather?address=${address}`)
        .then(response => response.json())
        .then(data => {

            if (data.error) {
                firstMessage.textContent = data.error;
            } else {
                firstMessage.textContent = data.location;
                secondMessage.textContent = data.forecast;
            }
        })
        .catch(err => {
            console.log(err)
        });
};

window.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.querySelector('form#weatherForm');

    if (weatherForm) {
        weatherForm.addEventListener('submit', event => {
            event.preventDefault();

            const addressInput = document.querySelector('input');

            fetchForecast(addressInput.value);
        });
    }
});