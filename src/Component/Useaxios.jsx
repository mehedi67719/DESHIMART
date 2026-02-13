import axios from "axios";

const useaxios=axios.create({
    baseURL:"https://deshimart-server.vercel.app/"
})

export default useaxios