import React, { Fragment } from 'react';

import {
    Modal, 
    ModalHeader, 
    ModalBody,
    ModalFooter,
    Button,
    Alert,
    Fade
} from 'reactstrap';


const deleteBook = props => {
    const { Title } = props.book;
    return(
        <Fragment>
            <Modal isOpen={props.modalState} backdrop="static">
                <ModalHeader toggle={props.toggleDeleteModal}>Delete Book</ModalHeader>
                <ModalBody>
                    <Alert color="danger">
                        <span>This action will <strong>permanently remove</strong> <br/>
                        <em>"{Title}"</em> from the list.</span><br/><br/>
                        <span>Click <Button color="success" size="sm" disabled>Yes</Button> if you would like to proceed?</span>
                        <Fade in={!props.showDelete} hidden={props.showDelete}>
                            <hr/>
                            <Button color="danger" onClick={props.deleteBook.bind(this, props.book)}>Delete</Button>
                        </Fade>
                    </Alert>
                </ModalBody>
                <ModalFooter>
                <Button color="success" onClick={props.confirmRemoval}>Yes</Button>{' '}
                <Button color="danger" onClick={props.toggleDeleteModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default deleteBook;