import axios from "axios";


const AxiosInstance = axios.create({
  baseURL: "https://digital-life-lessons-servers.vercel.app",
  
});

const useAxios = () => {
    return AxiosInstance;
}

export default useAxios;