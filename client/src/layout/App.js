import React, { Component } from 'react';
import axios from 'axios';

//import { GetAllBooks } from '../server';
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


  componentDidMount(){
    let date;
    axios.get("http://localhost:3000/api/Books")
    .then( ({ data }) => {
      data.map(book => {
        date = new Date(book.Publication_Date);
        book.Publication_Date = date.toLocaleDateString('en-US');
        return book.Publication_Date
      });
      this.setState({ books: data });
    })
    .catch(err => console.log(err))
  }

  // async componentDidMount() {
  //     const books = await GetAllBooks();
  //     console.log("cdm: ", books);

  //   this.setState({ books });
  // };

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
      price = this.state.book.Price.split('.');
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
          "Price": `${dollars}.${cents}`
        }
       });
    }
  }

  editBookHandler = (book, evt) => {
    evt.preventDefault();
    let books = [...this.state.books];
    axios.put(`http//localhost:3000/api/Books/${book.Book_Id}`, book)
    .then( ({ data }) => {
      console.log(data);
      this.setState({
        editModalIsOpen: !this.state.editModalIsOpen,
        books: books.map(b => ( b.id === book.id ? {...book} : b ))
      });
    })
    .catch(err => console.log(err));
  }

  addBookHandler = evt => {
    evt.preventDefault();
    let { book, books } = this.state;
    const post = {...book};
    delete post["Book_Id"];
    post.Publication_Date = post.Publication_Date.toISOString();

    axios.post("http://localhost:3000/api/Books", post)
    .then(resp => {
      console.log(resp.data)
      books.push(post);
      this.setState({ 
        books, 
        addModalIsOpen: !this.state.addModalIsOpen,
        book: this.state.book.map(el => el = '')
      })
    })
    .catch(err => console.log(err))
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
