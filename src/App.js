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
        <form>
          <input type="text" id="un" />
          <button type="submit" onClick={(event) => doSomething(event)}>
            Search
          </button>
        </form>

        {bookComponents &&
          bookComponents.map((book) => {
            return book;
          })}
      </div>
    </div>
  );
}

function BookComponent(props) {
  return (
    <div className="column">
      <div className="book">
        <div>{props.book.authorName}</div>
        <img src={props.book.imageUrl} />
        <div>{props.book.title}</div>
      </div>
    </div>
  );
}
export default App;
