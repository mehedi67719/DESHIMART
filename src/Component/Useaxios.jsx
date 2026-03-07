import axios from "axios";

const useaxios=axios.create({
    baseURL:"https://deshimart-server.onrender.com/"
})

export default useaxios