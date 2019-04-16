import axios from 'axios';

const prefix = 'http://localhost:3000/api/Books';

export async function GetAllBooks() {
    const response = await axios.get(prefix);
    return response;
};

export async function EditBook(data, id) {
    const response = await axios.put(`${prefix}${id}`, data);  
    return response;
};

export async function AddBook(data) {
    const response = await axios.post(prefix, data);
    return response;
};

export async function RemoveBook(id) {
    const response = await axios.delete(`${prefix}${id}`);
    return response;
}