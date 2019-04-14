import React, { Component } from 'react';

// import { GetAllBooks } from '../server';
import AddBookModal from './ui/modal/AddBook';
import EditBookModal from './ui/modal/EditBook';
import DeleteBookModal from './ui/modal/DeleteBook';
import BookTable from './ui/table/BookTable';
import ContainerBar from './ui/navigation/ContainerBar';


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
    addModalIsOpen: false,
    deleteModalIsOpen: false,
    showDeleteBtn: true,
    editModalIsOpen: false,
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

  editBookHandler = (book, evt) => {
    evt.preventDefault();
    let books = [...this.state.books];
    this.setState({
      editModalIsOpen: !this.state.editModalIsOpen,
      books: books.map(b => ( b.id === book.id ? {...book} : b ))
    });
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
      addModalIsOpen: !this.state.addModalIsOpen
    })
    console.log("new book added", this.state.book)
  }

  deleteBookHandler = (book) => {
    this.setState(prevState => ({
      deleteModalIsOpen: !prevState.deleteModalIsOpen,
      showDeleteBtn: !prevState.showDeleteBtn,
      books: prevState.books.filter( b => b !== book )
    }));
    console.log("book deleted")
  }

  toggleAddModalHandler = evt => {
    evt.preventDefault();
    this.setState(prevState => ({
      addModalIsOpen: !prevState.addModalIsOpen,
    }));
  }

  toggleEditModalHandler = (book, evt) => {
    if (!this.state.editModalIsOpen) {
      this.setState(prevState => ({
        editModalIsOpen: !prevState.editModalIsOpen,
        book
      }));
    }
  }

  toggleDeleteModalHandler = (book, evt) => {
    if (!this.state.deleteModalIsOpen) (
      this.setState(prevState => ({
        deleteModalIsOpen: !prevState.deleteModalIsOpen,
        book
      }))
    ) 
    else if (this.state.deleteModalIsOpen && !this.state.showDeleteBtn) (
      this.setState(prevState => ({
        deleteModalIsOpen: !prevState.deleteModalIsOpen,
        showDeleteBtn: true
      }))
    )
    else if (this.state.deleteModalIsOpen && this.state.showDeleteBtn) {
      this.setState(prevState => ({
        deleteModalIsOpen: !prevState.deleteModalIsOpen
      }))
    }
  }

  render() {
    // const { books } = this.state;
    // console.log("render: ",books);
    return (
      <div className="App">
        <header className="App-header container mt-5">
          <ContainerBar className="mt-5" toggleAdd={this.toggleAddModalHandler} />

          <AddBookModal 
            modalState={this.state.addModalIsOpen}
            changed={this.handleChange}
            toggleAddModal={this.toggleAddModalHandler}
            addBook={this.addBookHandler}
          />
          <EditBookModal
            {...this.state}
            modalState={this.state.editModalIsOpen}
            changed={this.handleChange}
            toggleEditModal={this.toggleEditModalHandler}
            editBook={this.editBookHandler}
          />
          <DeleteBookModal 
            {...this.state}
            modalState={this.state.deleteModalIsOpen}
            toggleDeleteModal={this.toggleDeleteModalHandler}
            deleteBook={this.deleteBookHandler}
            confirmRemoval={() => this.setState({ showDeleteBtn: false })}
            showDelete={this.state.showDeleteBtn}
          />
          <BookTable 
            {...this.state}
            toggleEditModal={this.toggleEditModalHandler}
            toggleDeleteModal={this.toggleDeleteModalHandler}
          />
        </header>
      </div>
    );
  }
}

export default App;
