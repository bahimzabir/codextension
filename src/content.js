
async function convertCurrency(from, to, amount) {
    var requestURL = `http://localhost:8000/convert?from=${from}&to=${to}&amount=${amount}`;
    try {
        const response = await fetch(requestURL);
        const data = await response.text();
        console.log(data);
        if(response.ok)  {
            return data;
        } else throw new Error('Error Occured');
    } catch (error) {
        throw new Error(error);
    }
}

queries = document.querySelectorAll('.card-offer');
queries.forEach((item) => {
    
    const price = item.querySelector('.offer-price').innerText.replace(/[^0-9]/g, '');
    const url = item.querySelectorAll('div.offer-country img')[0].getAttribute('src');
    const country = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    convertCurrency(country, 'USD', price)
    .then((data) => {
     item.querySelector('.offer-price').insertAdjacentHTML('afterend', `<h5 class="offer-price">$ ${parseFloat(data).toFixed(2)}</h5>`);
    })
    .catch((error) => {
        console.log(error);
        console.log('ERROR');
    });
});

