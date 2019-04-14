import React from 'react';

import { Table, Button } from 'reactstrap';

const bookTable = props => {
    const { books } = props;
    return (
        <Table bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Publication Date</th>
                <th>Price</th>
                <th>Description</th>
                <th>Author</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => {
                const { 
                  id, title, genre, publication_date, price, description, author 
                } = book;
                return (
                <tr key={id}>
                  <th scope="row">{id}</th>
                  <td>{title}</td>
                  <td>{genre}</td>
                  <td>{publication_date}</td>
                  <td>{price}</td>
                  <td>{description}</td>
                  <td>{author}</td>
                  <td>
                    <Button 
                        color="success" 
                        size="sm" 
                        className="mx-1"
                        onClick={props.toggleEditModal.bind(this, book)}
                    >Edit
                    </Button>
                    <Button 
                        color="danger" 
                        size="sm" 
                        className="mx-1"
                        onClick={props.toggleDeleteModal.bind(this, book)}
                    >Delete
                    </Button>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </Table>
    );
}

export default bookTable;