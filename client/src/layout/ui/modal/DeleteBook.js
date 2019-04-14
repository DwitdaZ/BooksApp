import React, { Fragment } from 'react';

import {
    Modal, 
    ModalHeader, 
    ModalBody,
    ModalFooter,
    Button,
    Alert
} from 'reactstrap';


const deleteBook = props => {
    return(
        <Fragment>
            <Modal isOpen={props.modalState} backdrop="static">
                <ModalHeader toggle={props.toggleDeleteModal}>Delete Book</ModalHeader>
                <ModalBody>
                    <Alert color="danger">
                        <span>This action will <strong>permanently remove</strong> the selected book.</span><br/>
                        <span>Click <Button color="success" size="sm" disabled>Yes</Button> if you would like to proceed?</span>
                        <div hidden={props.showDelete}>
                            <hr/>
                            <Button color="danger" onClick={props.deleteBook}>Delete</Button>
                        </div>
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