const axios = require("axios");

async function getAllBooks() {
  try {
    const response = await axios.get("http://localhost:5000/");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getAllBooks();

async function getBookByISBN(isbn) {
  try {
    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getBookByISBN("1");

async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`http://localhost:5000/author/${author}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getBooksByAuthor("Chinua Achebe");

async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`http://localhost:5000/title/${title}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getBooksByTitle("Things Fall Apart");
