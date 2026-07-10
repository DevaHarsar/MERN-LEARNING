import api from "../api"

const API = `${import.meta.env.VITE_API_URL}/admin/dashboard`;

export const getDashboard = ()=>{

    return api.get(API);

}