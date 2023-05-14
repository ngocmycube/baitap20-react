import React, { useState, useContext } from "react";
import BookEdit from "./BookEdit";
import BooksContext from "../context/books";

const BookShow = ({ book, onDelete, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleClickDelete = () => {
    onDelete(book.id);
  };
  const handleClickEdit = () => {
    setIsEdit(!isEdit);
  };
  const editBook = (title) => {
    onEdit(book.id, title);
    setIsEdit(!isEdit);
  };
  let content = <h2>{book.title}</h2>;
  if (isEdit) {
    content = <BookEdit book={book} onEdit={editBook} />;
  }
  return (
    <div id={`book-id-${book.id}`} className="book-item">
      <div className="">
        <button className="edit" onClick={handleClickEdit}>
          edit
        </button>
        <button className="delete" onClick={handleClickDelete}>
          delete
        </button>
      </div>
      <img alt="book" src={`https://picsum.photos/seed/${book.id}/200/300`} />
      {content}
    </div>
  );
};

export default BookShow;
