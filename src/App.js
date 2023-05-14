import BookCreate from "./components/BookCreate";
import React from "react";
import { useState, useEffect } from "react";
import Booklist from "./components/BookList";
import "./style.css";
import axios from "axios";

const App = () => {
  const [books, setBooks] = useState([]);
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });
    console.log(response);
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };
  const editBook = async (id, title) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title,
    });
    const updatedBooks = books.map((book) => {
      if (book.id === id) return { id: book.id, title };
      else return book;
    });
    setBooks(updatedBooks);
  };
  const fetchBooks = async () => {
    console.log("test");
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <Booklist books={books} onDelete={deleteBook} onEdit={editBook} />
      <BookCreate onCreate={createBook} />
    </div>
  );
};

export default App;
