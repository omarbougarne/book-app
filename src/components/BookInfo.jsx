import React from "react";

const BookInfo = ({ book }) => {
  if (!book) return null;

  const imageUrl = book.volumeInfo?.imageLinks?.thumbnail;

  return (
    <div className="bookshelf-item">
      <div className="bookshelf-item-content">
        <div className="bookshelf-item-details">
          <h2>{book.volumeInfo.title}</h2>
          <p>By: {book.volumeInfo.authors?.join(", ")}</p>
          <p>Genre: {book.volumeInfo.categories?.join(", ")}</p>
          <p
            style={{
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
            }}
          >
            Description: {book.volumeInfo.description}
          </p>
        </div>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={book.volumeInfo.title}
            className="bookshelf-item-image"
          />
        )}
      </div>
    </div>
  );
};

export default BookInfo;
