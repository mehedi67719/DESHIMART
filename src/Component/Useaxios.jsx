import axios from "axios";
import { getAuth } from "firebase/auth";


const useaxios = axios.create({
    baseURL: "https://deshimart-server.onrender.com/"
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