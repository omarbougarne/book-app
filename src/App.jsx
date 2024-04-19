import React, { useState, useEffect } from "react";
import BookInfo from "./components/BookInfo";
import Reviews from "./components/Reviews";
import Recommendation from "./components/Recommendation";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookData, setBookData] = useState([]);
  const [reviews, setReviews] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (searchTerm) {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyCT83Qm5jyhMPdfcuvPsCrWBFon6WtLpuE&maxResults=10`
          );
          const data = await response.json();
          setBookData(data.items || []);
        } else {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=*&key=AIzaSyCT83Qm5jyhMPdfcuvPsCrWBFon6WtLpuE&maxResults=10`
          );
          const data = await response.json();
          setBookData(data.items || []);
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (bookData.length > 0) {
          const isbnArray = bookData.map(
            (book) =>
              book.volumeInfo.industryIdentifiers.find(
                (identifier) => identifier.type === "ISBN_13"
              )?.identifier
          );
          const response = await fetch(
            `https://your-review-api.com/reviews?isbn=${isbnArray.join(",")}`
          );
          const data = await response.json();
          setReviews(data.reviews || []);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [bookData]);

  return (
    <div className="container">
      <h1 className="mt-3">Book Search</h1>
      <input
        type="text"
        className="form-control mb-3"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Enter book title or author"
      />
      <div className="row">
        <div className="col-md-8">
          {bookData.length > 0 && (
            <>
              <h2 className="mt-3">Search Results</h2>
              <div className="row">
                {bookData.map((book) => (
                  <div key={book.id} className="col-md-6 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <BookInfo book={book} />
                        {reviews.length > 0 && <Reviews reviews={reviews} />}
                        {reviews.length === 0 && (
                          <p className="text-muted">
                            No reviews found for this book.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="col-md-4">
          <Recommendation />
        </div>
      </div>
    </div>
  );
}

export default App;
