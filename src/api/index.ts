import axios from "axios";

const blogBazaarApi = axios.create({
    baseURL: "http://localhost:3000/api/v1"
})

export default blogBazaarApi;