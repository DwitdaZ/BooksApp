import React, { Fragment } from 'react';

import {
  Toast, 
  ToastBody, 
  ToastHeader, 
  Table, 
  Button, 
  Spinner 
} from 'reactstrap';

const bookTable = props => {
  const { books } = props;

  return (
    <Fragment>
      { books.length === 0 || !books 
      ? (
        <div className="d-flex flex-row justify-content-center">
          <div className="d-flex flex-column justify-content-center">
            <Toast className="spinner-toast">
              <ToastHeader icon={<Spinner size="lg" color="primary" />}>
                Loading
              </ToastHeader>
              <ToastBody>
                We are rounding you up some reading material — thanks for waiting!
              </ToastBody>
            </Toast>
          </div>  
        </div>  
        )
      : ( <Table bordered hover>
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Publication<span style={{color:"white"}}>_</span>Date</th>
                <th>Price</th>
                <th>Description</th>
                <th>Author</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => {
                const { 
                  Book_Id: id, Title, Genre, Publication_Date, Price, Description, Author_Id 
                } = book;
                return (
                <tr key={id}>
                  <th className="text-center" scope="row">{id}</th>
                  <td>{Title}</td>
                  <td className="text-center">{Genre}</td>
                  <td className="text-center">{Publication_Date}</td>
                  <td className="text-center">{Price}</td>
                  <td>{Description}</td>
                  <td className="text-center">{Author_Id}</td>
                  <td>
                    <Button 
                        color="success" 
                        size="sm" 
                        className="m-1 btn-block"
                        onClick={props.toggleEditModal.bind(this, book)}
                    >Edit
                    </Button>
                    <Button 
                        color="danger" 
                        size="sm" 
                        className="m-1 btn-block"
                        onClick={props.toggleDeleteModal.bind(this, book)}
                    >Delete
                    </Button>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </Table>
        )
      }
    </Fragment>
  );
}

export default bookTable;