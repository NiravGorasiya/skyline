import axios from "axios"

const url = "http://localhost:5000"

//user login router
export const userlogin = (data) => {
    return axios.post(`${url}/api/user/signin`, data)
}

//getall notes

export const allbook = () => {
    return axios.get(`${url}/api/book/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
};
export const addBook = (data) => {
    return axios.post(`${url}/api/book/add`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
}

export const updatebook = (data, id) => {
    return axios.put(`${url}/api/book/update/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
}

export const deletebook = (id) => {
    return axios.delete(`${url}/api/book/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
}