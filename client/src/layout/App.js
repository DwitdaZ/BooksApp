import React, { Component } from 'react';

import { GetAllBooks, EditBook, AddBook, RemoveBook } from '../server';
import AddBookModal from './ui/modal/AddBook';
import EditBookModal from './ui/modal/EditBook';
import DeleteBookModal from './ui/modal/DeleteBook';
import BookTable from './ui/table/BookTable';
import ContainerBar from './ui/navigation/ContainerBar';


class App extends Component {
  state = {
    books: [],
    book: {
      Book_Id: 0,
      Title: '',
      Genre: '',
      Publication_Date: '',
      Price: '0.00',
      Description: '',
      Author_Id: ''
    },
    addModalIsOpen: false,
    deleteModalIsOpen: false,
    showDeleteBtn: true,
    editModalIsOpen: false,
  };


  async componentDidMount() {
    try {
      const resp = await GetAllBooks();
      if (!resp) throw Error(resp.statusText);
      const books = await resp.data
      let date;
      books.map( book => {
          date = new Date(book.Publication_Date);
          book.Publication_Date = date.toLocaleDateString('en-US');
          return book.Publication_Date
      });
      this.setState({ books });
    } catch (e) { console.log(e); }
  };

  handleChange = ({ target: { name: key, value: val } }) => {
    if (key !== 'dollars' && key !== 'cents') {
      if (key === 'Publication_Date') {
        let date = new Date(val);
        val = date.toLocaleDateString('en-US');
      }
      this.setState({ book : {
          ...this.state.book,
          [key]: val
        }
      });
    } else {
      let price = this.state.book.Price.split('.');
      let dollars = price[0];
      let cents = price[1];

      if (key === 'dollars')
        dollars = val;
      else if (key === 'cents') {
        if (val < 10)
          cents = '0' + val;
        else
          cents = val;
      }

      this.setState({ book : {
          ...this.state.book,
          "Price": `${dollars}.${cents}`
        }
      });
    };
  }

  editBookHandler = (book, evt) => {
    evt.preventDefault();
    let books = [...this.state.books];
    try {
      ( async () => {
      const resp = await EditBook(book.Book_Id, book);
      if (!resp) throw Error(resp.statusText);
      console.log(await resp.data);
      this.setState({
        editModalIsOpen: !this.state.editModalIsOpen,
        books: books.map(b => ( b.id === book.Book_Id ? {...book} : b ))
      });
    })();
    } catch(e) { console.log(e); }
  }

  addBookHandler = (evt) => {
    evt.preventDefault();
    let { book, books } = this.state;
    try {
      ( async () => {
        const post = {...book};
        delete post["Book_Id"];
        let date = new Date(post.Publication_Date);
        post.Publication_Date = date.toLocaleDateString();
        const resp = await AddBook(post);
        if (!resp) throw Error(resp.statusText);
        console.log(await resp.data);
        post["Book_Id"] = books[books.length-1].Book_Id+1;
        books.push(post);
        this.setState({ 
          books, 
          addModalIsOpen: !this.state.addModalIsOpen
        });
      })();
    } catch(e) { console.log(e); }
  }

  deleteBookHandler = (book) => {
    try {
      ( async () => {
        const resp = await RemoveBook(book.Book_Id);
        if (!resp) throw Error(resp.statusText);
        console.log(await resp.data);
        this.setState(prevState => ({
          deleteModalIsOpen: !prevState.deleteModalIsOpen,
          showDeleteBtn: !prevState.showDeleteBtn,
          books: prevState.books.filter( b => b !== book )
        }));
      })();
    } catch(e) { console.log(e); }
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
    } else {
      this.setState(prevState => ({
        editModalIsOpen: !prevState.editModalIsOpen,
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
