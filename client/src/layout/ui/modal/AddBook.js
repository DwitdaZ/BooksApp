import React, { Fragment } from 'react';

import {
    Modal, 
    ModalHeader, 
    ModalBody,
    ModalFooter,
    Form,
    Row, Col,
    FormGroup,
    Input,
    Label,
    Button,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';


const addBookModal = props => {
    return (
        <Fragment>
            <Modal isOpen={props.modalState} toggle={props.toggleAddModal} backdrop="static">
                <ModalHeader toggle={props.toggleAddModal}>Add Book</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" name="title" onChange={props.changed} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input id="author" name="author" onChange={props.changed} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="genre">Genre</Label>
                            <Input id="genre" name="genre" onChange={props.changed} />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="price">Price</Label>
                                    <InputGroup>
                                        <InputGroupAddon id="price" addonType="prepend">$</InputGroupAddon>
                                        <Input name="dollars" placeholder="0" min={0} max={100} type="number" step="1" onChange={props.changed} />
                                        <Input name="cents" placeholder=".00" min={0} max={99} type="number" step="1" onChange={props.changed} />
                                    </InputGroup>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="publication">Publication Date</Label>
                                    <Input
                                        type="date"
                                        name="publication_date"
                                        id="publication"
                                        placeholder="date placeholder" 
                                        onChange={props.changed}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description" onChange={props.changed} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={props.addBook}>Add</Button>{' '}
                <Button color="danger" onClick={props.toggleAddModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default addBookModal;