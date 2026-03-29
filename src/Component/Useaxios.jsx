import axios from "axios";
import { getAuth } from "firebase/auth";


const useaxios = axios.create({
    baseURL: "http://localhost:3000/"
});

useaxios.interceptors.request.use(
    async (config) => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken(); 
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default useaxios;