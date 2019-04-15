import axios from 'axios';

const host = 'http://localhost:63396';

export const GetAllBooks = async () => {
    const { resp: data } = await axios.get(`${host}/api/Books`)
    console.log("axios: ", data)
    return data;
};