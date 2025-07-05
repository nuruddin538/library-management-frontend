import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./home/Navbar";
import { HomePage } from "./pages/HomePage";
import { BookListPage } from "./pages/BookListPage";
import { AddBookPage } from "./pages/AddBookPage";
import { EditBookPage } from "./pages/EditBookPage";
import { BorrowBookPage } from "./pages/BorrowBookPage";
import { Footer } from "./home/Footer";
import { Notification } from "./home/Notification";
import { BorrowSummaryPage } from "./pages/BorrowSummaryPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BookListPage />} />
              <Route path="/create-book" element={<AddBookPage />} />
              <Route path="/edit-book/:id" element={<EditBookPage />} />
              <Route path="/borrow/:bookId" element={<BorrowBookPage />} />
              <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
            </Routes>
          </main>
          <Footer />
          <Notification />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
