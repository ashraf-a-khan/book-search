import "./App.css";
import React, { useState } from "react";
let bookList = [];
function App() {
  const [bookComponents, setBooks] = useState(null);

  let apiUrl = async (term) => {
    var postResp = await fetch(
      `https://goodreads-server-express--dotdash.repl.co/search/${term}`
    );

    bookList = await postResp.json();
  };

  async function doSomething(event) {
    var searchItem = document.getElementById("un").value;
    console.log(searchItem);

    await apiUrl(searchItem).then(() => {
      console.log(bookList.list);

      setBooks(
        bookList.list.map((book, index) => {
          return <BookComponent key={index} book={book} />;
        })
      );
    });
    event.preventDefault();
  }

  return (
    <div className="App">
      <div>
        <form className="example">
          <input type="text" id="un" />
          <button
            className="button"
            type="button"
            onClick={(event) => doSomething(event)}
          >
            Search
          </button>
        </form>
        <div className="books">
          {bookComponents &&
            bookComponents.map((book) => {
              return book;
            })}
        </div>
      </div>
    </div>
  );
}

function BookComponent(props) {
  return (
    <div className="book">
      <div>Author Name: {props.book.authorName}</div>
      <img src={props.book.imageUrl} alt="" />
      <div>Title: {props.book.title}</div>
    </div>
  );
}
export default App;
