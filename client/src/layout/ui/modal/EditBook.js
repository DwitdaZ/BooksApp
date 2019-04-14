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


const editBook = props => {
    // console.log(props)
    const { title, genre, publication_date: date, price, description, author } = props.book;
    const money = price.split('.');
    const dollars = money[0];
    const cents = money[1];
    const formatDate = date.split('/');
    let mth = formatDate[0];
    if (mth < 10)
        mth = `0${mth}`;
    let day = formatDate[1];
    if (day < 10)
        day = `0${day}`;
    const year = formatDate[2];
    return(
        <Fragment>
            <Modal isOpen={props.modalState} toggle={props.toggleEditModal} backdrop="static">
                <ModalHeader toggle={props.toggleEditModal}>Update Book</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" name="title" value={title} onChange={props.changed} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input id="author" name="author" value={author} onChange={props.changed} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="genre">Genre</Label>
                            <Input id="genre" name="genre" value={genre} onChange={props.changed} />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="price">Price</Label>
                                    <InputGroup>
                                        <InputGroupAddon id="price" addonType="prepend">$</InputGroupAddon>
                                        <Input name="dollars" placeholder="0" min={0} max={100} type="number" step="1" value={dollars} onChange={props.changed} />
                                        <Input name="cents" placeholder=".00" min={0} max={99} type="number" step="1" value={cents} onChange={props.changed} />
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
                                        value={`${year}-${mth}-${day}`} 
                                        onChange={props.changed}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="description" id="description" value={description} onChange={props.changed} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={props.editBook.bind(this, props.book)}>Submit</Button>{' '}
                <Button color="danger" onClick={props.toggleEditModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
}

export default editBook;