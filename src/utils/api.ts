import axios from "axios";

const token: any = localStorage.getItem('token');

export default axios.create({
    baseURL: "https://expensetracker-be.herokuapp.com",
    headers: {
        Authorization: token,
    }
})