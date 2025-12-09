import axios from "axios";


const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
    return AxiosInstance;
}

export default useAxios;