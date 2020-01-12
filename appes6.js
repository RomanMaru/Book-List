class Book {
  constructor(title, author, isbn) {
    this.title = title,
      this.author = author,
      this.isbn = isbn
  }
}

class Store {
  static getBooks() {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }

    return books
  }

  static displayBooks() {
    const books = Store.getBooks()

    books.forEach(book => {
      const ui = new UI

      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks()

    books.push(book)

    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn, index) {
    const books = Store.getBooks()
    books.forEach(book => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list')

    const row = document.createElement('tr')

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row)
  }

  showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')

    container.insertBefore(div, form)
    setTimeout(() => {
      document.querySelector('.alert').remove()
    }, 3000)
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }

  clearFields() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }
}

document.addEventListener('DOMContentLoaded', Store.displayBooks)

document.getElementById('book-form').addEventListener('submit', event => {
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  const book = new Book(title, author, isbn)

  const ui = new UI()

  if (title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    ``
    ui.addBookToList(book)
    ui.showAlert('Book Added', 'success')
    Store.addBook(book)
    ui.clearFields()
  }
  event.preventDefault()
})

document.getElementById('book-list').addEventListener('click', event => {
  const ui = new UI()
  ui.deleteBook(event.target)
  Store.removeBook(event.target.parentElement.previousElementSibling.textContent)
  ui.showAlert('Book removed', 'success')
  event.preventDefault()
})