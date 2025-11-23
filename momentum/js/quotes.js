//QOUTES 

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const button = document.querySelector('.change-quote');

async function getQuotes() {  
    const quotes = 'assets/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let random = Math.floor(Math.random() * 29) + 1;
    quote.textContent = data[random].text;
    author.textContent = data[random].author;
  }
  getQuotes();

  button.addEventListener('click', getQuotes);