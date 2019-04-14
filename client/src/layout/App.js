import React, { Component } from 'react';

import './App.css';
// import { GetAllBooks } from '../server';
import AddBookModal from './ui/modal/AddBook';
import BookTable from './ui/table/BookTable';

const testDefault = [
  {
    id: 1,
    title: 'Some Title',
    genre: 'Horror',
    publication_date: '4/11/2019',
    price: '15.00',
    description: 'This is the books description',
    author: 'Darris Cooper'
  }
]

class App extends Component {
  state = {
    books: [],
    book: {
      id: 0,
      title: '',
      genre: '',
      publication_date: '',
      price: '0.00',
      description: '',
      author: ''
    },
    modalIsOpen: false,
    addingBook: false,
    editingBook: false,
  };

  // async componentDidMount() {
  //     const books = await GetAllBooks();
  //     console.log("cdm: ", books);

  //   this.setState({ books });
  // };

  componentDidMount() {
    this.setState({ books: testDefault });
  }

  handleChange = ({ target }) => {
    const key = target.name;
    const val = target.value;
    let price, dollars, cents;

    if (key !== 'dollars' && key !== 'cents') {
      this.setState({ 
        book : {
          ...this.state.book,
          [key]: val
        }
      });
    } else {
      price = this.state.book.price.split('.');
      dollars = price[0];
      cents = price[1];

      if (key === 'dollars')
        dollars = val;
      else if (key === 'cents') {
        if (val < 10)
          cents = '0' + val;
        else
          cents = val;
      }

      this.setState({
        book : {
          ...this.state.book,
          "price": `${dollars}.${cents}`
        }
       });
    }
  }

  editBookHandler = evt => {
    evt.preventDefault();
    console.log("book updated")
  }

  addBookHandler = evt => {
    evt.preventDefault();
    let book = {...this.state.book};
    let id = this.state.books.length + 1;
    let books = [...this.state.books];
    let date = new Date(this.state.book.publication_date);
    book.id = id++;
    book.publication_date = date.toLocaleDateString();
    books.push(book);
    this.setState({
      books,
      modalIsOpen: !this.state.modalIsOpen
    })
    console.log("new book added", this.state.book)
  }

  deleteBookHandler = evt => {
    evt.preventDefault();
    console.log("book deleted")
  }

  toggleModalHandler = evt => {
    this.setState(prevState => ({
      modalIsOpen: !prevState.modalIsOpen,
      addingBook: !prevState.addingBook
    }));
  }

  render() {
    const { books } = this.state;
    console.log("render: ",books);
    return (
      <div className="App container">
        <AddBookModal 
          modalState={this.state.modalIsOpen}
          changed={this.handleChange}
          exitModal={this.toggleModalHandler}
          addBook={this.addBookHandler}
        />
        <header className="App-header">
          <BookTable 
            {...this.state}
            editBook={this.editBookHandler}
            deleteBook={this.deleteBookHandler}
          />
        </header>
      </div>
    );
  }
}

export default App;
