import bookService from "../services/book.service.js";

async function createBookController(req, res) {
  const newBook = req.body;
  const userId = req.userId;

  try {
    const createdBook = await bookService.createBookService(newBook, userId);
    res.status(201).send(createdBook);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function findAllBooksController(req, res) {
  try {
    const books = await bookService.findAllBooksService();
    return res.send(books);
  } catch (error) {
    return res.status(404).send(error.message);
  }
}

async function findBookByIdController(req, res) {
  try {
    const bookId = req.params.id;
    const book = await bookService.findBookByIdService(bookId);
    return res.send(book);
  } catch (error) {
    return res.status(400).send(error.message);
  }
}

async function updateBookController(req, res) {
  try {
    const updatedBook = req.body;
    const bookId = req.params.id;
    const userId = req.userId;
    const response = await bookService.updateBookService(
      updatedBook,
      bookId,
      userId
    );
    return res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteBookController(req, res) {
  try {
    const bookId = req.params.id;
    const userId = req.userId;
    const response = await bookService.deleteBookService(bookId, userId);
    return res.send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function searchBooksController(req, res) {
  try {
    const { text } = req.query;
    const books = await bookService.searchBooksService(text);
    return res.send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export default {
  createBookController,
  findAllBooksController,
  findBookByIdController,
  updateBookController,
  deleteBookController,
  searchBooksController,
};
