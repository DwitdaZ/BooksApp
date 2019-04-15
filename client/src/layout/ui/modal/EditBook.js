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
    const { Title, Genre, Publication_Date: date, Price, Description, Author_Id } = props.book;
    console.log(props.book)
    const money = Price.toLocaleString().split('.');
    const dollars = money[0];
    const cents = money[1];

    // const formatDate = date.split('/');
    // let mth = formatDate[0];
    // if (mth < 10)
    //     mth = `0${mth}`;
    // let day = formatDate[1];
    // if (day < 10)
    //     day = `0${day}`;
    // const year = formatDate[2];
    //let localDate = new Date(date);

    return(
        <Fragment>
            <Modal isOpen={props.modalState} toggle={props.toggleEditModal} backdrop="static">
                <ModalHeader toggle={props.toggleEditModal}>Update Book</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input id="title" name="Title" value={Title} onChange={props.changed} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="author">Author</Label>
                            <Input id="author" name="Author_Id" value={Author_Id} onChange={props.changed} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="genre">Genre</Label>
                            <Input id="genre" name="Genre" value={Genre} onChange={props.changed} />
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
                                        name="Publication_Date"
                                        id="publication"
                                        placeholder="date placeholder"
                                        value={date} 
                                        onChange={props.changed}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="textarea" name="Description" id="description" value={Description} onChange={props.changed} />
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