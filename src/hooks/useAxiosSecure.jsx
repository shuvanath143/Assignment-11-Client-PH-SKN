import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()

  // interceptors request
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`
      return config
    })

    // interceptor response
    const resInterceptor = axiosSecure.interceptors.response.use((response) => {

      return response;
    }, (error) => {

      const statusCode = error.status
      if (statusCode === 401 || statusCode === 403) {
        logout()
          .then(() => {
            navigate('/login')
          })
      }

      return Promise.reject(error);
    })

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    }
  }, [user, navigate, logout])

  return axiosSecure;
};

export default useAxiosSecure;
