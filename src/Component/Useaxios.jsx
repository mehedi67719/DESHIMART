import axios from "axios";

const useaxios=axios.create({
    baseURL:"http://localhost:3000/"
})

export default useaxios